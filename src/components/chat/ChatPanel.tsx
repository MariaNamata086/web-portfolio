'use client';

import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'assistant'; text: string };

const suggestions = ['What has she built with Next.js?', 'Is she available for work?', 'I need a site for my business'];

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text: "Hi, I'm Maria's assistant. I know her projects, her stack, and what she's available for. Ask me anything, or tell me about a site you're thinking of building and I'll put a brief together for her.",
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<'none' | 'network' | 'rate' | 'off'>('none');
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.querySelector<HTMLElement>('input')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next: Msg[] = [...messages, { role: 'user', text }];
    setMessages(next);
    setInput('');
    setBusy(true);
    setError('none');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      if (res.status === 429) {
        setError('rate');
        return;
      }
      if (res.status === 503) {
        setError('off');
        return;
      }
      if (!res.ok) throw new Error('bad status');
      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }]);
    } catch {
      setError('network');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      ref={panelRef}
      role='dialog'
      aria-label="Chat with Maria's assistant"
      className='fixed right-3 bottom-3 left-3 z-90 flex max-h-[min(640px,calc(100vh-52px))] flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_24px_70px_rgba(0,0,0,0.3)] md:right-6.5 md:bottom-6.5 md:left-auto md:w-[392px]'
    >
      <div className='flex items-center justify-between bg-forest px-5 py-4 text-on-forest'>
        <div>
          <b className='font-display text-[16px] font-semibold'>Ask about my work</b>
          <small className='mt-0.5 block font-mono text-[10px] tracking-[0.07em] uppercase opacity-70'>
            Trained on Maria&rsquo;s projects
          </small>
        </div>
        <button onClick={onClose} aria-label='Close chat' className='cursor-pointer text-[19px] opacity-75'>
          ×
        </button>
      </div>

      <div ref={bodyRef} className='flex flex-1 flex-col gap-3.5 overflow-y-auto p-5'>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[86%] rounded-[18px] px-4 py-3.5 text-[15px] leading-[1.55] ${
              m.role === 'assistant'
                ? 'self-start rounded-bl-[6px] border border-line-soft bg-paper-2'
                : 'self-end rounded-br-[6px] bg-clay text-on-clay'
            }`}
          >
            {m.text}
          </div>
        ))}

        {busy && (
          <div className='self-start rounded-[18px] rounded-bl-[6px] border border-line-soft bg-paper-2 px-4 py-3.5'>
            <span className='inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink-faint' />
            <span className='mx-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink-faint' />
            <span className='inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink-faint' />
          </div>
        )}

        {error === 'rate' && (
          <div className='rounded-xl bg-ochre-soft px-4 py-3.5 text-[13.5px] text-ochre-ink'>
            <b className='mb-1 block font-display text-[14.5px] font-semibold'>Take it to Maria</b>
            That is a lot of good questions, and I have hit my limit for the hour. She reads everything herself and replies
            within a day. <a href='/contact' className='font-semibold underline'>Open the contact form</a>
          </div>
        )}
        {error === 'off' && (
          <div className='rounded-xl bg-ochre-soft px-4 py-3.5 text-[13.5px] text-ochre-ink'>
            <b className='mb-1 block font-display text-[14.5px] font-semibold'>The assistant is off right now</b>
            It runs on a monthly budget and has used this month&rsquo;s. Everything it knows is on the site anyway, and Maria
            answers faster. <a href='/contact' className='font-semibold underline'>Send her a message</a>
          </div>
        )}
        {error === 'network' && (
          <div className='rounded-xl border border-danger bg-danger-soft px-4 py-3.5 text-[13.5px] text-danger'>
            <b className='mb-1 block font-display text-[14.5px] font-semibold'>That did not send</b>
            This is usually the connection rather than anything you did. Try again in a moment.
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className='flex flex-wrap gap-2 px-5 pb-3.5'>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className='cursor-pointer rounded-pill border border-line px-3 py-2 text-left text-[13px] text-ink-soft transition hover:border-forest hover:bg-forest hover:text-on-forest'
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className='flex items-center gap-2.5 border-t border-line bg-paper-2 px-4 py-3.5'
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message…'
          aria-label='Message'
          className='flex-1 rounded-pill border border-line bg-paper px-4 py-2.5 text-[15px] text-ink outline-none focus:border-clay'
        />
        <button type='submit' aria-label='Send' disabled={busy} className='h-[42px] w-[42px] cursor-pointer rounded-pill bg-clay text-[16px] text-on-clay disabled:opacity-50'>
          →
        </button>
      </form>
    </div>
  );
}
