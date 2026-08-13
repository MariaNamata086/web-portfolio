import Link from 'next/link';
import { site } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export default function ContactSection() {
  return (
    <section id='contact' className='px-[22px] py-16 md:px-10 md:py-25'>
      <div className='mx-auto max-w-[var(--maxw)]'>
        <Reveal variant='rvZ'>
          <div className='grid gap-9 rounded-[var(--r-panel)] bg-[var(--ink)] p-6 text-[var(--paper)] md:grid-cols-2 md:gap-14 md:p-14'>
            <div>
              <span className='mb-3.5 inline-block rounded-[var(--r-pill)] bg-[var(--ochre)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.14em] text-[var(--on-ochre)] uppercase'>
                06 / Contact
              </span>
              <h2 className='font-[family-name:var(--font-display)] text-[clamp(32px,4vw,50px)] leading-none font-bold tracking-[-0.04em]'>
                Let&rsquo;s{' '}
                <span className='font-[family-name:var(--font-serif)] font-normal text-[var(--ochre)] italic'>talk</span>
              </h2>
              <p className='mt-5 max-w-[38ch] text-[17.5px] leading-[1.7] opacity-75'>
                Whether you are hiring, or you have a site that needs building or rescuing, the form is the fastest way to
                reach me. I reply within a day.
              </p>
              <Link
                href='/contact'
                className='mt-8 inline-flex items-center gap-2.5 rounded-[var(--r-pill)] bg-[var(--clay)] px-6.5 py-3.5 font-semibold text-[var(--on-clay)] transition hover:-translate-y-0.5'
              >
                Start a conversation <span aria-hidden='true'>→</span>
              </Link>
            </div>
            <div className='mt-2 flex flex-col'>
              {[
                { label: site.email, href: `mailto:${site.email}` },
                { label: 'GitHub', href: site.github },
                { label: 'LinkedIn', href: site.linkedin },
                { label: 'Download CV', href: site.cv },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className='flex items-center justify-between border-b border-white/15 py-4 text-[16px] transition-all duration-300 hover:pl-2 hover:text-[var(--ochre)]'
                >
                  <span>{l.label}</span>
                  <span aria-hidden='true'>↗</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
