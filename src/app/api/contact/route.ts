import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Honeypot and timing are checked on the client too. Repeated here because
// anything can POST to this route directly.
export async function POST(req: Request) {
  const data = (await req.json()) as Record<string, string>;

  if (data.website) return NextResponse.json({ ok: true });
  if (!data.name?.trim() || !data.email?.includes('@') || (data.message ?? '').trim().length < 10) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!key || !to || !from) {
    console.warn('[contact] Resend is not configured. Message was not sent.', data);
    return NextResponse.json({ error: 'not_configured' }, { status: 500 });
  }

  const lines = [
    `Intent: ${data.intent}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.org ? `Organisation: ${data.org}` : '',
    data.budget ? `Budget: ${data.budget}` : '',
    data.a ? `Extra 1: ${data.a}` : '',
    data.b ? `Extra 2: ${data.b}` : '',
    '',
    data.message,
  ].filter(Boolean);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    signal: AbortSignal.timeout(10_000),
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: `Portfolio: ${data.intent} from ${data.name}`,
      text: lines.join('\n'),
    }),
  });

  if (!res.ok) return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
