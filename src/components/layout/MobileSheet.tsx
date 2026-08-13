'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { nav } from '@/lib/site';

export default function MobileSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const first = ref.current?.querySelector<HTMLElement>('button, a');
    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>('a, button')).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const firstEl = items[0]!;
      const lastEl = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role='dialog'
      aria-modal='true'
      aria-label='Menu'
      className='fixed inset-0 z-90 flex flex-col bg-[var(--paper)] p-[22px]'
    >
      <div className='mb-[18px] flex items-center justify-between'>
        <span className='font-[family-name:var(--font-display)] text-[19px] font-extrabold tracking-[-0.03em]'>
          maria<em className='font-[family-name:var(--font-serif)] font-normal text-[var(--clay)] not-italic'>.</em>
        </span>
        <button
          onClick={onClose}
          aria-label='Close menu'
          className='grid h-[38px] w-[38px] place-items-center rounded-[var(--r-pill)] border border-[var(--line)] bg-[var(--paper-2)] text-[var(--ink)]'
        >
          ×
        </button>
      </div>
      <nav className='flex flex-col'>
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={onClose}
            className='border-b border-[var(--line)] py-4 font-[family-name:var(--font-display)] text-[32px] font-bold tracking-[-0.03em]'
          >
            {n.label}
          </Link>
        ))}
        <Link
          href='/contact'
          onClick={onClose}
          className='border-b border-[var(--line)] py-4 font-[family-name:var(--font-display)] text-[32px] font-bold tracking-[-0.03em]'
        >
          Contact
        </Link>
      </nav>
      <Link
        href='/contact'
        onClick={onClose}
        className='mt-auto rounded-[var(--r-pill)] bg-[var(--forest)] p-4 text-center font-semibold text-[var(--on-forest)]'
      >
        Say hi
      </Link>
    </div>
  );
}
