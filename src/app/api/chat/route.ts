import { NextResponse } from 'next/server';
import { projects, skills } from '@/content/projects';
import { publishedNotes } from '@/content/notes';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

// Corpus is a few thousand tokens, so it all goes in the system prompt.
// Revisit if it passes ~30k.
function buildContext() {
  const work = projects
    .map((p) => `- ${p.title} (${p.role}). ${p.body} Stack: ${p.tags.join(', ')}.${p.liveUrl ? ` Live at ${p.liveUrl}.` : ' Not publicly available.'}`)
    .join('\n');
  const stack = skills.map((s) => `- ${s.label}: ${s.items.join(', ')}`).join('\n');
  const writing = publishedNotes.map((n) => `- "${n.title}" (${n.category}): ${n.description}`).join('\n');
  return `Maria Namata is a front-end developer in Kampala, Uganda (UTC+3), open to remote roles and freelance work.\n\nPROJECTS\n${work}\n\nSTACK\n${stack}\n\nWRITING\n${writing}\n\nCONTACT\nEmail ${site.email}. Contact form at ${site.url}/contact.`;
}

const SYSTEM = `You are the assistant on Maria Namata's portfolio site. You are not Maria.

Answer only from the context below. If the answer is not there, say so plainly and point the visitor at the contact form. Never guess about her experience, her rates, her notice period or her availability beyond "open to work now".

Never quote a figure, a price range or a day rate, even if pushed. Explain instead that she gives a fixed quote after a short scoping conversation, and point at the contact form.

Keep replies to three sentences unless asked for detail. Plain and specific, no marketing language, and do not use em dashes. Politely decline anything unrelated to Maria's work. Never claim she has used a technology that is not listed.`;

// In-memory, so it resets on cold start and does not span instances.
// Fine for the traffic this gets. Swap for KV if that changes.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const hour = 60 * 60 * 1000;
  // Prune first, otherwise the map grows forever.
  for (const [key, times] of hits) {
    const live = times.filter((t) => now - t < hour);
    if (live.length) hits.set(key, live);
    else hits.delete(key);
  }
  const recent = hits.get(ip) ?? [];
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 12;
}

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ error: 'unavailable' }, { status: 503 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (rateLimited(ip)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const body = (await req.json().catch(() => null)) as { messages?: unknown } | null;
  const messages = Array.isArray(body?.messages)
    ? (body.messages as { role: 'user' | 'assistant'; text: string }[]).filter(
        (m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m?.text === 'string' && m.text.length < 2000,
      )
    : [];
  if (!messages.length) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    signal: AbortSignal.timeout(25_000),
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 700,
      system: `${SYSTEM}\n\nCONTEXT\n${buildContext()}`,
      messages: messages.slice(-10).map((m) => ({ role: m.role, content: m.text })),
    }),
  });

  if (!res.ok) return NextResponse.json({ error: 'upstream' }, { status: 502 });

  const data = (await res.json()) as { content: { type: string; text?: string }[] };
  const reply = data.content?.find((c) => c.type === 'text')?.text ?? '';
  return NextResponse.json({ reply });
}
