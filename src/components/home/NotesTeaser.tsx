import Link from 'next/link';
import { notes } from '@/content/notes';
import { Reveal, Stagger } from '@/components/ui/Reveal';

const tints = ['bg-clay-soft', 'bg-forest-soft', 'bg-ochre-soft'];

export default function NotesTeaser() {
  return (
    <section id='notes' className='px-5.5 py-16 md:px-10 md:py-25'>
      <div className='mx-auto max-w-site'>
        <div className='mb-12 flex flex-wrap items-end justify-between gap-10'>
          <Reveal variant='rvL'>
            <span className='mb-3.5 inline-block rounded-pill bg-clay px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-on-clay uppercase'>
              05 / Notes
            </span>
            <h2 className='max-w-[16ch] font-display text-[clamp(32px,4vw,50px)] leading-none font-bold tracking-[-0.04em]'>
              Things I worked out the hard way
            </h2>
          </Reveal>
          <Reveal variant='rvR' className='max-w-[400px]'>
            <p className='text-[16px] text-ink-soft'>Short write-ups from real projects. Click one.</p>
          </Reveal>
        </div>

        <Stagger className='grid gap-5.5 md:grid-cols-3'>
          {notes.slice(0, 3).map((n, i) => (
            <Link
              key={n.slug}
              href={n.published ? `/notes/${n.slug}` : '/notes'}
              className={`block rounded-[18px] border border-line-soft p-6 transition-transform duration-500 hover:-translate-y-2 hover:-rotate-[0.7deg] ${tints[i % 3]}`}
            >
              <div className='mb-3 font-mono text-[10px] tracking-[0.08em] text-ink-soft uppercase'>
                {n.category} · {n.readingMinutes} min{n.published ? '' : ' · coming soon'}
              </div>
              <h3 className='font-display text-[20px] leading-[1.22] font-semibold tracking-[-0.025em]'>{n.title}</h3>
              <p className='mt-2.5 text-[15px] text-ink-soft'>{n.description}</p>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
