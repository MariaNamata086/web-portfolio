import { skills } from '@/content/projects';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function Skills() {
  return (
    <section id='skills' className='px-5.5 py-16 md:px-10 md:py-25'>
      <div className='mx-auto max-w-site'>
        <div className='mb-12 flex flex-wrap items-end justify-between gap-10'>
          <Reveal variant='rvL'>
            <Eyebrow className='mb-3.5'>04 / Stack</Eyebrow>
            <h2 className='max-w-[14ch] font-display text-[clamp(32px,4vw,50px)] leading-none font-bold tracking-[-0.04em]'>
              What I work with
            </h2>
          </Reveal>
          <Reveal variant='rvR' className='max-w-[400px]'>
            <p className='text-[16px] text-ink-soft'>Roughly in order of how often I reach for it.</p>
          </Reveal>
        </div>

        <div className='border-t-2 border-ink'>
          {skills.map((row) => (
            <Reveal key={row.label} variant='rvL'>
              <div className='grid items-baseline gap-4 border-b border-line py-6 transition-all duration-400 hover:bg-paper-2 hover:pl-3.5 md:grid-cols-[220px_1fr] md:gap-7.5'>
                <h3 className='font-display text-[19px] font-semibold tracking-[-0.02em]'>{row.label}</h3>
                <Stagger className='flex flex-wrap gap-2'>
                  {row.items.map((i) => (
                    <span
                      key={i}
                      className='rounded-pill border border-line bg-paper px-4 py-1.5 text-[14px] text-ink-soft transition duration-250 hover:-translate-y-0.5 hover:border-clay hover:bg-clay hover:text-on-clay'
                    >
                      {i}
                    </span>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
