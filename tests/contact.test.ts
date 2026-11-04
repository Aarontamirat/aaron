import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "../src/lib/contact-validation.ts";
import {
  allowContact,
  deliverContact,
  emailConfigured,
} from "../src/lib/contact-service.ts";

const realFetch = globalThis.fetch;
const originalEnvironment = { ...process.env };
afterEach(() => {
  globalThis.fetch = realFetch;
  for (const key of [
    "RESEND_API_KEY",
    "CONTACT_FROM_EMAIL",
    "CONTACT_TO_EMAIL",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
  ]) {
    if (originalEnvironment[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnvironment[key];
  }
});
const now = 1_800_000_000_000;
const validMessage = () => ({
  name: "Alex Morgan",
  email: "alex@example.com",
  topic: "Engineering opportunity",
  message: "I’d like to discuss a full-stack engineering role with you.",
  website: "",
  startedAt: now - 5000,
});

test("accepts a genuine message and trims surrounding whitespace", () => {
  const result = validateContact(
    { ...validMessage(), name: "  Alex Morgan  " },
    now,
  );
  assert.equal(result.data?.name, "Alex Morgan");
  assert.deepEqual(result.errors, {});
});

test("rejects invalid fields, oversized messages, and header injection", () => {
  const result = validateContact(
    {
      ...validMessage(),
      name: "A\r\nBcc: bad",
      email: "alex@example.com\r\nBcc: bad",
      topic: "spam",
      message: "x".repeat(4001),
    },
    now,
  );
  assert.ok(
    result.errors.name &&
      result.errors.email &&
      result.errors.topic &&
      result.errors.message,
  );
});

test("rejects honeypots, immediate submissions, future timestamps, and expired forms", () => {
  assert.ok(
    validateContact({ ...validMessage(), website: "https://spam.example" }, now)
      .errors.website,
  );
  for (const startedAt of [now, now + 1, now - 86_400_001, NaN, 0])
    assert.ok(
      validateContact({ ...validMessage(), startedAt }, now).errors.startedAt,
    );
});

test("rejects malformed bodies without throwing", () => {
  for (const value of [
    null,
    undefined,
    0,
    "message",
    [],
    {},
    { name: { nested: "Alex" } },
  ])
    assert.equal(validateContact(value, now).data, undefined);
});

test("delivery requires both a key and a verified sender", () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  assert.equal(emailConfigured(), false);
  process.env.RESEND_API_KEY = "test-key";
  assert.equal(emailConfigured(), false);
  process.env.CONTACT_FROM_EMAIL = "portfolio@example.com";
  assert.equal(emailConfigured(), true);
});

test("passes a plain-text message and reply address to the provider", async () => {
  process.env.RESEND_API_KEY = "test-key";
  process.env.CONTACT_FROM_EMAIL = "portfolio@example.com";
  globalThis.fetch = async (url, init) => {
    assert.equal(url, "https://api.resend.com/emails");
    const body = JSON.parse(init?.body as string);
    assert.deepEqual(body.to, ["aaron@example.com"]);
    assert.equal(body.reply_to, "alex@example.com");
    assert.equal(body.html, undefined);
    assert.match(body.text, /Alex Morgan/);
    return Response.json({ id: "provider-message-id" });
  };
  await deliverContact(validMessage(), "aaron@example.com");
});

test("never reports delivery on provider rejection or a malformed success", async () => {
  for (const response of [
    Response.json({ error: "Rejected" }, { status: 403 }),
    Response.json({}),
    Response.json({ id: "" }),
  ]) {
    globalThis.fetch = async () => response;
    await assert.rejects(deliverContact(validMessage(), "aaron@example.com"));
  }
});

test("limits repeated submissions in one server instance", async () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  for (let i = 0; i < 5; i++)
    assert.equal(await allowContact("unit-test-client"), true);
  assert.equal(await allowContact("unit-test-client"), false);
});

test("uses the atomic shared limiter and fails closed when it is unavailable", async () => {
  process.env.UPSTASH_REDIS_REST_URL = "https://redis.example.com";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(init?.body as string);
    assert.equal(body[0], "EVAL");
    assert.match(body[3], /^portfolio:contact:[a-f0-9]{64}$/);
    return Response.json({ result: 6 });
  };
  assert.equal(await allowContact("shared-client"), false);
  globalThis.fetch = async () =>
    Response.json({ error: "Unavailable" }, { status: 500 });
  await assert.rejects(allowContact("shared-client"));
});
