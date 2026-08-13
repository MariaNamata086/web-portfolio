import Image from 'next/image';
import Link from 'next/link';
import portrait from '@public/maria.png';
import { site } from '@/lib/site';
import HeroBackground from './HeroBackground';
import Marquee from './Marquee';

export default function Hero() {
  return (
    <section className='relative isolate px-[22px] pt-16 pb-10 md:px-10'>
      <HeroBackground />
      <div className='relative mx-auto max-w-[var(--maxw)]'>
        <div className='grid items-end gap-9 md:grid-cols-[1.3fr_0.88fr] md:gap-13'>
          <div>
            <div className='mb-6 inline-flex items-center gap-2.5 rounded-[var(--r-pill)] bg-[var(--forest-soft)] px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.09em] text-[var(--forest)] uppercase'>
              <span className='pulse-ring relative block h-[7px] w-[7px] rounded-full bg-[var(--forest)]' />
              {site.role} · {site.location}
            </div>

            <h1 className='font-[family-name:var(--font-display)] text-[clamp(44px,6.1vw,80px)] leading-[0.95] font-extrabold tracking-[-0.045em]'>
              <span className='line-mask'>
                <i>Hi, I&rsquo;m Maria.</i>
              </span>
              <span className='line-mask'>
                <i>
                  I build the{' '}
                  <span className='font-[family-name:var(--font-serif)] font-normal text-[var(--clay)] italic'>websites</span>
                </i>
              </span>
              <span className='line-mask'>
                <i>people actually use.</i>
              </span>
            </h1>

            <p className='fade-up mt-6 max-w-[520px] text-[19px] leading-[1.55] text-[var(--ink-soft)]' style={{ animationDelay: '500ms' }}>
              I take a Figma file and hand back something live. Three years of React, Next.js and TypeScript, shipping for a
              safari operator, a farm training centre and an e-commerce platform. Everything I build gets opened on a slow
              connection before I call it finished, because that is the connection most of my visitors are on.
            </p>

            <div className='fade-up mt-8 flex flex-wrap gap-3' style={{ animationDelay: '620ms' }}>
              <Link
                href='#work'
                className='inline-flex items-center gap-2.5 rounded-[var(--r-pill)] bg-[var(--clay)] px-6 py-3.5 text-[15px] font-medium text-[var(--on-clay)] transition duration-300 hover:bg-[var(--ink)] hover:text-[var(--paper)]'
              >
                See the work <span aria-hidden='true'>→</span>
              </Link>
              <a
                href={site.cv}
                download
                className='inline-flex items-center gap-2.5 rounded-[var(--r-pill)] border border-[var(--ink)] px-6 py-3.5 text-[15px] font-medium transition duration-300 hover:bg-[var(--ink)] hover:text-[var(--paper)]'
              >
                Download CV <span aria-hidden='true'>↓</span>
              </a>
            </div>
          </div>

          <div className='relative w-full max-w-[340px] justify-self-start md:justify-self-end'>
            <div aria-hidden='true' className='absolute -top-8 -left-11 -z-10 h-[190px] w-[190px] rounded-full bg-[var(--ochre)] opacity-[0.28]' />
            <div aria-hidden='true' className='absolute -right-9 bottom-10 -z-10 h-[130px] w-[130px] rounded-full bg-[var(--clay)] opacity-[0.22]' />
            <div className='relative aspect-[5/6] overflow-hidden rounded-t-[170px] rounded-b-[20px] border border-[var(--line)] bg-[var(--paper-3)]'>
              <Image src={portrait} alt='Maria Namata' priority sizes='(max-width: 900px) 260px, 340px' className='h-full w-full object-cover object-top' />
            </div>
            <div className='mt-3.5 flex justify-between font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.07em] text-[var(--ink-faint)] uppercase'>
              <span>Open to remote</span>
              <span>UTC+3</span>
            </div>
          </div>
        </div>

        <Marquee />
      </div>
    </section>
  );
}
