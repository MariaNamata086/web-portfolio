import Link from 'next/link';
import type { Metadata } from 'next';

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
          <Link href='/' className='rounded-pill border border-clay bg-clay px-5.5 py-3 text-[15px] font-medium text-on-clay transition hover:border-ink hover:bg-ink hover:text-paper'>
            Back to home
          </Link>
          <Link href='/#work' className='rounded-pill border border-line px-5.5 py-3 text-[15px] font-medium transition hover:border-ink hover:bg-ink hover:text-paper'>
            See the work
          </Link>
          <Link href='/notes' className='rounded-pill border border-line px-5.5 py-3 text-[15px] font-medium transition hover:border-ink hover:bg-ink hover:text-paper'>
            Read the notes
          </Link>
          <Link href='/contact' className='rounded-pill border border-line px-5.5 py-3 text-[15px] font-medium transition hover:border-ink hover:bg-ink hover:text-paper'>
            Get in touch
          </Link>
        </div>
        <div className='mt-8.5 font-mono text-[10.5px] tracking-[0.09em] text-ink-faint uppercase'>
          If a link on this site sent you here, I would like to know
        </div>
      </div>
    </div>
  );
}
