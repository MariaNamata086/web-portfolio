'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='grid min-h-[70vh] place-items-center px-[22px] py-16 text-center md:px-10'>
      <div>
        <span className='mb-4.5 inline-block rounded-pill bg-danger-soft px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-danger uppercase'>
          Something broke
        </span>
        <h1 className='max-w-[18ch] font-display text-[clamp(30px,4.6vw,52px)] leading-[1.02] font-extrabold tracking-[-0.04em]'>
          That is my fault, not yours
        </h1>
        <p className='mx-auto mt-4.5 max-w-[46ch] text-[19px] text-ink-soft'>
          Something on this page failed to render. Trying again usually works. If it does not, I would genuinely like to
          know, because this is exactly the sort of thing this site is supposed to get right.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-2.5'>
          <button
            onClick={reset}
            className='cursor-pointer rounded-pill bg-clay px-5.5 py-3 text-[15px] font-medium text-on-clay transition hover:bg-ink hover:text-paper'
          >
            Try again
          </button>
          <Link
            href='/'
            className='rounded-pill border border-line px-5.5 py-3 text-[15px] font-medium transition hover:bg-ink hover:text-paper'
          >
            Back to home
          </Link>
        </div>
        {error.digest && (
          <p className='mt-8 font-mono text-[10.5px] tracking-[0.09em] text-ink-faint uppercase'>
            Reference {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
