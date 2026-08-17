import type { Metadata } from 'next';
import { PillButton } from '@/components/ui/PillButton';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className='grid min-h-[78vh] place-items-center px-5.5 py-17 text-center md:px-10'>
      <div>
        <div className='font-display text-[clamp(96px,20vw,230px)] leading-[0.82] font-extrabold tracking-[-0.06em] text-clay'>
          404
        </div>
        <h1 className='mt-3.5 font-display text-[clamp(30px,4.6vw,54px)] leading-[1.02] font-extrabold tracking-[-0.04em]'>
          This page does not exist
        </h1>
        <p className='mx-auto mt-4.5 max-w-[46ch] text-[19px] text-ink-soft'>
          It loaded quickly though, which is something. You have probably followed a link that has moved, or typed something
          slightly wrong.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-2.5'>
          <PillButton href='/'>Back to home</PillButton>
          <PillButton href='/#work' variant='outline'>
            See the work
          </PillButton>
          <PillButton href='/notes' variant='outline'>
            Read the notes
          </PillButton>
          <PillButton href='/contact' variant='outline'>
            Get in touch
          </PillButton>
        </div>
        <div className='mt-8.5 font-mono text-[10.5px] tracking-[0.09em] text-ink-faint uppercase'>
          If a link on this site sent you here, I would like to know
        </div>
      </div>
    </div>
  );
}
