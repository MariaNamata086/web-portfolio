import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className='grid min-h-[78vh] place-items-center px-[22px] py-17 text-center md:px-10'>
      <div>
        <div className='font-[family-name:var(--font-display)] text-[clamp(96px,20vw,230px)] leading-[0.82] font-extrabold tracking-[-0.06em] text-[var(--clay)]'>
          404
        </div>
        <h1 className='mt-3.5 font-[family-name:var(--font-display)] text-[clamp(30px,4.6vw,54px)] leading-[1.02] font-extrabold tracking-[-0.04em]'>
          This page does not exist
        </h1>
        <p className='mx-auto mt-4.5 max-w-[46ch] text-[19px] text-[var(--ink-soft)]'>
          It loaded quickly though, which is something. You have probably followed a link that has moved, or typed something
          slightly wrong.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-2.5'>
          <Link href='/' className='rounded-[var(--r-pill)] border border-[var(--clay)] bg-[var(--clay)] px-5.5 py-3 text-[15px] font-medium text-[var(--on-clay)] transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]'>
            Back to home
          </Link>
          <Link href='/#work' className='rounded-[var(--r-pill)] border border-[var(--line)] px-5.5 py-3 text-[15px] font-medium transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]'>
            See the work
          </Link>
          <Link href='/notes' className='rounded-[var(--r-pill)] border border-[var(--line)] px-5.5 py-3 text-[15px] font-medium transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]'>
            Read the notes
          </Link>
          <Link href='/contact' className='rounded-[var(--r-pill)] border border-[var(--line)] px-5.5 py-3 text-[15px] font-medium transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]'>
            Get in touch
          </Link>
        </div>
        <div className='mt-8.5 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.09em] text-[var(--ink-faint)] uppercase'>
          If a link on this site sent you here, I would like to know
        </div>
      </div>
    </div>
  );
}
