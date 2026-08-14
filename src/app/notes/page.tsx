import type { Metadata } from 'next';
import Link from 'next/link';
import { notes } from '@/content/notes';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Short write-ups from real projects. Mostly things that went wrong first, and what I changed afterwards.',
  alternates: { canonical: '/notes' },
};

const catTint: Record<string, string> = {
  Performance: 'bg-clay-soft text-clay',
  Payments: 'bg-forest-soft text-forest',
  Accessibility: 'bg-ochre-soft text-ochre-ink',
};

export default function NotesIndex() {
  return (
    <div className='mx-auto max-w-site px-5.5 md:px-10'>
      <header className='pt-16 pb-10'>
        <span className='mb-4.5 inline-block rounded-pill bg-clay px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-on-clay uppercase'>
          Notes
        </span>
        <h1 className='font-display text-[clamp(40px,5.6vw,68px)] leading-[0.98] font-extrabold tracking-[-0.045em]'>
          Things I worked out
          <br />
          the hard way
        </h1>
        <p className='mt-5 max-w-[56ch] text-[19px] text-ink-soft'>
          Short write-ups from real projects. Mostly things that went wrong first, and what I changed afterwards. No
          listicles, no tutorials rewritten from the docs.
        </p>
      </header>

      <div className='border-t-2 border-ink pb-22'>
        {notes.map((n) => {
          const inner = (
            <>
              <div className='pt-1.5 font-mono text-[10.5px] tracking-[0.08em] text-ink-faint uppercase md:w-37.5'>
                {n.published
                  ? new Date(n.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                  : 'Coming soon'}
                {n.published ? ` · ${n.readingMinutes} minute read` : ''}
              </div>
              <div className='flex-1'>
                <span className={`mb-3 inline-block rounded-pill px-2.5 py-1 font-mono text-[9.5px] tracking-[0.09em] uppercase ${catTint[n.category]}`}>
                  {n.category}
                </span>
                <h2 className='max-w-[22ch] font-display text-[25px] leading-[1.14] font-bold tracking-[-0.03em] md:text-[29px]'>
                  {n.title}
                </h2>
                <p className='mt-2.5 max-w-[62ch] text-[16.5px] text-ink-soft'>{n.description}</p>
              </div>
              {n.published && <span aria-hidden='true' className='hidden pt-1 text-[22px] text-clay md:block'>↗</span>}
            </>
          );

          return n.published ? (
            <Link
              key={n.slug}
              href={`/notes/${n.slug}`}
              className='flex flex-col gap-3 border-b border-line py-8.5 transition-all duration-400 hover:pl-3 md:flex-row md:gap-7'
            >
              {inner}
            </Link>
          ) : (
            <div key={n.slug} className='flex flex-col gap-3 border-b border-line py-8.5 opacity-70 md:flex-row md:gap-7'>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
