'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { projects } from '@/content/projects';
import { Reveal, Stagger } from '@/components/ui/Reveal';

export default function WorkSection() {
  const [active, setActive] = useState(0);
  const cards = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      let idx = 0;
      cards.current.forEach((c, i) => {
        if (c && c.getBoundingClientRect().top < window.innerHeight * 0.55) idx = i;
      });
      setActive(idx);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const borders = ['border-t-[var(--clay)]', 'border-t-[var(--forest)]', 'border-t-[var(--ochre)]', 'border-t-[var(--plum)]'];

  return (
    <section id='work' className='px-[22px] py-16 md:px-10 md:py-25'>
      <div className='mx-auto max-w-[var(--maxw)]'>
        <div className='mb-12 flex flex-wrap items-end justify-between gap-10'>
          <Reveal variant='rvL'>
            <span className='mb-3.5 inline-block rounded-[var(--r-pill)] bg-[var(--clay)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.14em] text-[var(--on-clay)] uppercase'>
              01 / Work
            </span>
            <h2 className='max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(32px,4vw,50px)] leading-none font-bold tracking-[-0.04em]'>
              Things I&rsquo;ve built
            </h2>
          </Reveal>
          <Reveal variant='rvR' className='max-w-[400px]'>
            <p className='text-[16px] text-[var(--ink-soft)]'>
              Most of these are live right now. Open them, click around, break something if you can.
            </p>
          </Reveal>
        </div>

        <div className='grid items-start gap-6 md:grid-cols-[200px_1fr] md:gap-11'>
          <div className='static flex items-baseline gap-3.5 md:sticky md:top-30 md:block'>
            <div className='font-[family-name:var(--font-display)] text-[62px] leading-none font-bold tracking-[-0.05em] text-[var(--clay)]'>
              {String(active + 1).padStart(2, '0')}
              <small className='text-[19px] font-normal text-[var(--ink-faint)]'> / {String(projects.length).padStart(2, '0')}</small>
            </div>
            <div className='flex flex-row flex-wrap gap-2 md:mt-5 md:flex-col'>
              {projects.map((p, i) => (
                <span
                  key={p.slug}
                  className={`font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.06em] uppercase transition-all duration-300 ${
                    i === active
                      ? 'translate-x-1 rounded-[var(--r-pill)] bg-[var(--forest)] px-2.5 py-1.5 text-[var(--on-forest)]'
                      : 'text-[var(--ink-faint)]'
                  }`}
                >
                  {p.title}
                </span>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-5.5'>
            {projects.map((p, i) => (
              <Reveal key={p.slug} variant='rv'>
                <article
                  ref={(el: HTMLElement | null) => {
                    cards.current[i] = el;
                  }}
                  className={`group grid gap-7 rounded-[var(--r-card)] border border-[var(--line-soft)] border-t-4 bg-[var(--paper-2)] p-6.5 transition-transform duration-500 hover:-translate-y-2 md:grid-cols-[46%_1fr] md:items-center ${borders[i % 4]}`}
                >
                  {p.shot && (
                    <div
                      className='relative aspect-[16/10] overflow-hidden rounded-[var(--r-media)] border border-[var(--line)]'
                      style={{ background: p.shot.dark ? '#000' : 'var(--paper-3)' }}
                    >
                      <Image
                        src={p.shot.src}
                        alt={p.shot.alt}
                        sizes='(max-width: 900px) 90vw, 45vw'
                        className='h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105'
                      />
                    </div>
                  )}
                  <div>
                    <span className='mb-2.5 inline-block rounded-[var(--r-pill)] bg-[var(--clay-soft)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.1em] text-[var(--clay)] uppercase'>
                      {p.role}
                    </span>
                    <h3 className='font-[family-name:var(--font-display)] text-[24px] leading-[1.12] font-bold tracking-[-0.028em]'>
                      {p.title}
                    </h3>
                    <p className='mt-3 text-[15.5px] leading-[1.62] text-[var(--ink-soft)]'>{p.body}</p>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='mt-4 inline-flex items-center gap-2 border-b-2 border-[var(--clay)] pb-0.5 text-[14px] font-medium text-[var(--clay)]'
                      >
                        {p.liveUrl.replace('https://', '')} <span aria-hidden='true'>↗</span>
                      </a>
                    )}
                    <Stagger className='mt-4.5 flex flex-wrap gap-2'>
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className='rounded-[var(--r-pill)] bg-[var(--forest-soft)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.05em] text-[var(--forest)] uppercase'
                        >
                          {t}
                        </span>
                      ))}
                    </Stagger>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
