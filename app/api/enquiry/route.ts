import { NextResponse } from "next/server";
import { validateEnquiry, type Enquiry } from "@/lib/enquiry";

/**
 * Delivers discovery-call requests via Resend when configured.
 * Without RESEND_API_KEY + ENQUIRY_TO it returns 503 and the form
 * falls back to a pre-filled email, so no enquiry is silently lost.
 */
export async function POST(req: Request) {
  let data: Partial<Enquiry>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this.
  if (data.company) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(data);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  if (!key || !to) {
    return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 503 });
  }

  const clean = (s?: string) => (s ?? "").slice(0, 5000);
  const text = [
    `Name: ${clean(data.name)}`,
    `Email: ${clean(data.email)}`,
    `Business / website: ${clean(data.business) || "—"}`,
    `Looking for: ${clean(data.need)}`,
    "",
    clean(data.message),
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? "AURA <onboarding@resend.dev>",
      to: [to],
      reply_to: clean(data.email),
      subject: `Discovery call — ${clean(data.business) || clean(data.name)}`,
      text,
    }),
  });

  if (!res.ok) return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
