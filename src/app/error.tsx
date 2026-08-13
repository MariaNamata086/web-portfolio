'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='grid min-h-[70vh] place-items-center px-[22px] py-16 text-center md:px-10'>
      <div>
        <span className='mb-4.5 inline-block rounded-[var(--r-pill)] bg-[var(--danger-soft)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.14em] text-[var(--danger)] uppercase'>
          Something broke
        </span>
        <h1 className='max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(30px,4.6vw,52px)] leading-[1.02] font-extrabold tracking-[-0.04em]'>
          That is my fault, not yours
        </h1>
        <p className='mx-auto mt-4.5 max-w-[46ch] text-[19px] text-[var(--ink-soft)]'>
          Something on this page failed to render. Trying again usually works. If it does not, I would genuinely like to
          know, because this is exactly the sort of thing this site is supposed to get right.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-2.5'>
          <button
            onClick={reset}
            className='cursor-pointer rounded-[var(--r-pill)] bg-[var(--clay)] px-5.5 py-3 text-[15px] font-medium text-[var(--on-clay)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]'
          >
            Try again
          </button>
          <a
            href='/'
            className='rounded-[var(--r-pill)] border border-[var(--line)] px-5.5 py-3 text-[15px] font-medium transition hover:bg-[var(--ink)] hover:text-[var(--paper)]'
          >
            Back to home
          </a>
        </div>
        {error.digest && (
          <p className='mt-8 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.09em] text-[var(--ink-faint)] uppercase'>
            Reference {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
