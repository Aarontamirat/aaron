import { createHash, randomUUID } from "node:crypto";
import type { ContactMessage } from "./contact-validation";

const rateWindow = 15 * 60;
const rateLimit = 5;
const visits = new Map<string, { count: number; expires: number }>();

export function emailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
    process.env.CONTACT_FROM_EMAIL?.trim(),
  );
}

export async function allowContact(ip: string): Promise<boolean> {
  const key = `portfolio:contact:${createHash("sha256").update(ip).digest("hex")}`;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    const script =
      "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return n";
    const response = await fetch(redisUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", script, "1", key, String(rateWindow)]),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    const body = await response.json();
    if (!response.ok || typeof body.result !== "number")
      throw new Error("Rate limit service unavailable");
    return body.result <= rateLimit;
  }
  const now = Date.now();
  for (const [visitKey, visit] of visits)
    if (visit.expires <= now) visits.delete(visitKey);
  const visit = visits.get(key);
  if (visit) {
    visit.count += 1;
    return visit.count <= rateLimit;
  }
  if (visits.size >= 10_000) return false;
  visits.set(key, { count: 1, expires: now + rateWindow * 1000 });
  return true;
}

export async function deliverContact(
  message: ContactMessage,
  recipient: string,
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL || recipient],
      reply_to: message.email,
      subject: `Portfolio: ${message.topic}`,
      text: `From: ${message.name}\nEmail: ${message.email}\nTopic: ${message.topic}\n\n${message.message}`,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  const body = await response.json();
  if (!response.ok || typeof body.id !== "string" || !body.id)
    throw new Error("Email provider did not accept the message");
}
