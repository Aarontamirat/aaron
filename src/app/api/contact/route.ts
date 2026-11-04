import { portfolio } from "@/content/portfolio";
import { validateContact } from "@/lib/contact-validation";
import {
  allowContact,
  deliverContact,
  emailConfigured,
} from "@/lib/contact-service";

export const runtime = "nodejs";

function reply(
  body: object,
  status: number,
  extraHeaders: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

async function readBody(request: Request) {
  if (!request.body) throw new Error("Empty body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 12_000) {
      await reader.cancel();
      throw new Error("Body too large");
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  // Next.js can construct an internal localhost URL even when the browser uses
  // another host. Compare against the original Host received by the proxy too.
  const protocol =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    requestUrl.protocol.slice(0, -1);
  const host = request.headers.get("host");
  const hostOrigin =
    host && ["http", "https"].includes(protocol) ? `${protocol}://${host}` : "";
  const allowedOrigins = [
    new URL(portfolio.siteUrl).origin,
    requestUrl.origin,
    hostOrigin,
  ];
  if (!origin || !allowedOrigins.includes(origin))
    return reply({ error: "Please submit the form from this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ error: "Please submit a valid form." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 12_000)
    return reply({ error: "Your message is too long." }, 413);
  try {
    // Deploy behind a trusted proxy that overwrites these headers (Vercel does).
    const ip =
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (!(await allowContact(ip)))
      return reply(
        {
          error:
            "Too many attempts. Please try again in 15 minutes or email me directly.",
        },
        429,
        { "Retry-After": "900" },
      );
    let body: unknown;
    try {
      body = await readBody(request);
    } catch {
      return reply(
        { error: "Please submit a valid message of up to 4,000 characters." },
        400,
      );
    }
    const { data, errors } = validateContact(body);
    if (!data)
      return reply(
        { error: "Please check your message and try again.", errors },
        400,
      );
    if (!emailConfigured())
      return reply(
        {
          error: `Email delivery is currently unavailable. Please email ${portfolio.email} directly.`,
        },
        503,
      );
    await deliverContact(data, portfolio.email);
    return reply(
      {
        message: "Your message has been accepted. Thanks for getting in touch.",
      },
      200,
    );
  } catch {
    return reply(
      {
        error: `Your message could not be sent. Please try again or email ${portfolio.email} directly.`,
      },
      503,
    );
  }
}
