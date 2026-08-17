'use client';

import { useEffect } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PillButton } from '@/components/ui/PillButton';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='grid min-h-[70vh] place-items-center px-[22px] py-16 text-center md:px-10'>
      <div>
        <Eyebrow tone='danger' className='mb-4.5'>
          Something broke
        </Eyebrow>
        <h1 className='max-w-[18ch] font-display text-[clamp(30px,4.6vw,52px)] leading-[1.02] font-extrabold tracking-[-0.04em]'>
          That is my fault, not yours
        </h1>
        <p className='mx-auto mt-4.5 max-w-[46ch] text-[19px] text-ink-soft'>
          Something on this page failed to render. Trying again usually works. If it does not, I would genuinely like to
          know, because this is exactly the sort of thing this site is supposed to get right.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-2.5'>
          <PillButton onClick={reset}>Try again</PillButton>
          <PillButton href='/' variant='outline'>
            Back to home
          </PillButton>
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
