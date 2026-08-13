import Link from 'next/link';
import CountUp from '@/components/ui/CountUp';
import { Reveal, Stagger } from '@/components/ui/Reveal';

const stats = [
  { n: 3, suffix: '+', label: 'Years shipping', cls: 'bg-[var(--clay)] text-[var(--on-clay)]' },
  { n: 4, suffix: '', label: 'Sites in production', cls: 'bg-[var(--forest)] text-[var(--on-forest)]' },
  { n: 1, suffix: '', label: 'Mobile app', cls: 'bg-[var(--ochre)] text-[var(--on-ochre)]' },
  { n: 4, suffix: '', label: 'Industries', cls: 'bg-[var(--plum)] text-[#FFF0F5]' },
];

export default function AboutTeaser() {
  return (
    <section id='about' className='px-[22px] py-16 md:px-10 md:py-25'>
      <div className='mx-auto max-w-[var(--maxw)]'>
        <Reveal variant='rv'>
          <div className='grid items-start gap-9 rounded-[var(--r-panel)] border border-[var(--line-soft)] bg-[var(--paper-2)] p-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:p-14'>
            <div>
              <span className='mb-3.5 inline-block rounded-[var(--r-pill)] bg-[var(--clay)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.14em] text-[var(--on-clay)] uppercase'>
                03 / About
              </span>
              <h2 className='max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(32px,4vw,50px)] leading-none font-bold tracking-[-0.04em]'>
                A bit about me
              </h2>
              <Stagger className='mt-7.5 grid grid-cols-2 gap-3'>
                {stats.map((s) => (
                  <div key={s.label} className={`rounded-2xl p-5 ${s.cls}`}>
                    <b className='block font-[family-name:var(--font-display)] text-[36px] leading-none font-bold tracking-[-0.04em]'>
                      <CountUp to={s.n} suffix={s.suffix} />
                    </b>
                    <span className='mt-1.5 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.08em] uppercase opacity-85'>
                      {s.label}
                    </span>
                  </div>
                ))}
              </Stagger>
            </div>

            <div className='text-[17.5px] leading-[1.72] text-[var(--ink-soft)]'>
              <p className='mb-5 text-[21px] leading-[1.6] text-[var(--ink)]'>
                I taught myself to code. No bootcamp, no computer science degree, just a lot of evenings, a lot of
                documentation, and early projects that were genuinely bad before they got better.
              </p>
              <p className='mb-5'>
                Three years on I&rsquo;ve shipped for a network engineering firm, an e-commerce platform, a farm training
                centre and a safari company. What I like most is the handoff moment: someone hands me a Figma file and a
                rough idea of what they need, and I give back something live that behaves properly on whatever phone their
                customer happens to own.
              </p>
              <p className='mb-5'>
                I&rsquo;m particular about accessibility and page weight. Partly on principle, and partly because I live
                somewhere the network is not always generous, so I have watched plenty of beautiful sites fail in front of
                real people, including one of mine.
              </p>
              <p>
                <Link href='/about' className='border-b-2 border-[var(--clay)] pb-0.5 font-medium text-[var(--clay)]'>
                  The longer version is on the about page →
                </Link>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
