import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import portrait from '@public/maria.png';
import { story, howIWork, lessons, beliefs } from '@/content/about';
import { site } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    'How I started, how I work now, what I have learned from each place I have worked, and what I am looking for next.',
  alternates: { canonical: '/about' },
};

const facts = [
  { label: 'Based in', value: site.location },
  { label: 'Timezone', value: 'UTC+3' },
  { label: 'Languages', value: 'English, Luganda' },
  { label: 'Status', value: 'Open to work', accent: true },
];

const dots = ['bg-clay', 'bg-forest', 'bg-ochre'];
const borders = ['border-t-clay', 'border-t-forest', 'border-t-ochre'];

export default function AboutPage() {
  return (
    <div className='mx-auto max-w-(--maxw) px-5.5 md:px-10'>
      <section className='grid items-end gap-9 pt-10 pb-10 md:grid-cols-[1.25fr_0.8fr] md:gap-14 md:pt-16 md:pb-14'>
        <div>
          <span className='mb-4.5 inline-block rounded-(--r-pill) bg-clay px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-on-clay uppercase'>
            About
          </span>
          <h1 className='font-display text-[clamp(42px,5.8vw,74px)] leading-[0.96] font-extrabold tracking-[-0.045em]'>
            Most of what I know
            <br />
            is attached to
            <br />
            something that
            <br />
            <span className='font-serif font-normal text-clay italic'>went wrong</span> once.
          </h1>
          <p className='mt-5.5 max-w-[56ch] text-[21px] leading-[1.62] text-ink-soft'>
            This is the longer version. How I started, how I work now, what I have learned from each place I have worked, and
            what I am looking for next.
          </p>
        </div>
        <div className='relative aspect-5/6 w-full max-w-[320px] justify-self-start overflow-hidden rounded-t-[170px] rounded-b-[20px] border border-line bg-paper-3 md:justify-self-end'>
          <Image src={portrait} alt={site.name} priority sizes='(max-width: 900px) 240px, 320px' className='h-full w-full object-cover object-top' />
        </div>
      </section>

      <div className='grid gap-3 pb-16 sm:grid-cols-2 md:grid-cols-4'>
        {facts.map((f) => (
          <div key={f.label} className='rounded-2xl bg-paper-2 p-5'>
            <span className='mb-2 block font-mono text-[9.5px] tracking-widest text-ink-faint uppercase'>
              {f.label}
            </span>
            <b className={`block font-display text-[18px] font-semibold tracking-[-0.02em] ${f.accent ? 'text-forest' : ''}`}>
              {f.value}
            </b>
          </div>
        ))}
      </div>

      <Section title='How I got here'>
        <div className='grid gap-4.5 md:grid-cols-3'>
          {story.map((s, i) => (
            <div key={s.title} className={`rounded-[18px] border border-line-soft border-t-4 bg-paper-2 p-6 ${borders[i % 3]}`}>
              <div className='mb-2.5 font-mono text-[9.5px] tracking-widest text-ink-faint uppercase'>{s.tag}</div>
              <h3 className='font-display text-[20px] font-semibold tracking-[-0.02em]'>{s.title}</h3>
              <p className='mt-2.5 text-[15.5px] text-ink-soft'>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title='How I work'>
        <div className='flex flex-col'>
          {howIWork.map((s, i) => (
            <div key={s.title} className='grid grid-cols-[44px_1fr] items-start gap-4 border-b border-line py-6 transition-all duration-400 hover:pl-3 md:grid-cols-[56px_1fr] md:gap-5.5'>
              <div className='grid h-11 w-11 place-items-center rounded-full bg-clay-soft font-display text-[17px] font-bold text-clay'>
                {i + 1}
              </div>
              <div>
                <h3 className='font-display text-[20px] font-semibold tracking-[-0.02em]'>{s.title}</h3>
                <p className='mt-2 max-w-[60ch] text-[16.5px] text-ink-soft'>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title='What each job actually taught me'>
        <div className='relative pl-7.5'>
          <div aria-hidden='true' className='absolute top-2 bottom-2 left-1.5 w-0.5 bg-line' />
          {lessons.map((l, i) => (
            <div key={l.org} className='relative pb-9.5'>
              <span aria-hidden='true' className={`absolute top-1.5 -left-7.5 h-3.5 w-3.5 rounded-full border-[3px] border-paper ${dots[i % 3]}`} />
              <div className='mb-1.5 font-mono text-[10.5px] tracking-[0.09em] text-ink-faint uppercase'>{l.when}</div>
              <h3 className='font-display text-[20px] font-semibold tracking-[-0.02em]'>{l.org}</h3>
              <p className='mt-2 max-w-[58ch] text-[16.5px] text-ink-soft'>{l.context}</p>
              <div className={`mt-3.5 border-l-4 py-3.5 pl-5 ${i === 0 ? 'border-clay' : i === 1 ? 'border-forest' : 'border-ochre'}`}>
                <span className='mb-2 block font-mono text-[9.5px] tracking-widest text-ink-faint uppercase'>What it taught me</span>
                <p className='max-w-[52ch] font-serif text-[21px] leading-[1.45] text-ink italic'>{l.lesson}</p>
              </div>
            </div>
          ))}
        </div>
        <a href={site.cv} download className='inline-flex items-center gap-2 border-b-2 border-clay pb-0.5 text-[15.5px] font-medium text-clay'>
          Full history and dates are in the CV ↓
        </a>
      </Section>

      <Section title='A few things I believe'>
        <div className='flex flex-col'>
          {beliefs.map((b, i) => (
            <div key={b.title} className='grid grid-cols-[38px_1fr] items-start gap-4.5 border-b border-line py-5.5'>
              <i className='pt-1.5 font-mono text-[11px] text-clay not-italic'>{String(i + 1).padStart(2, '0')}</i>
              <div>
                <h3 className='max-w-[34ch] font-display text-[21px] leading-tight font-semibold tracking-tight'>{b.title}</h3>
                <p className='mt-1.5 max-w-[58ch] text-[16.5px] text-ink-soft'>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className='border-t border-line py-16 md:py-19'>
        <Reveal variant='rvZ'>
          <div className='rounded-panel bg-forest p-6 text-on-forest md:p-14'>
            <span className='mb-4.5 inline-block rounded-pill bg-ochre px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-on-ochre uppercase'>
              What I am looking for
            </span>
            <h2 className='max-w-[18ch] font-display text-[clamp(28px,3.4vw,42px)] leading-[1.02] font-bold tracking-[-0.04em]'>
              A team that reviews code and cares whether the thing works
            </h2>
            <p className='mt-5 max-w-[58ch] text-[18px] leading-[1.72] opacity-88'>
              I am open to remote front-end roles, contract or permanent, and to freelance projects. I work from Kampala on
              UTC+3, which overlaps a full working day with Europe and most of the morning with the east coast of North
              America.
            </p>
            <ul className='mt-6 ml-5 list-disc text-[17px] leading-normal'>
              <li className='mb-3 opacity-90'>Front-end work in React, Next.js or React Native, with TypeScript</li>
              <li className='mb-3 opacity-90'>A team where code review is normal and design and engineering actually talk</li>
              <li className='mb-3 opacity-90'>Products with real users on imperfect devices and connections, which is most products</li>
              <li className='opacity-90'>Somewhere accessibility and performance are part of the work, not a phase at the end</li>
            </ul>
            <Link href='/contact' className='mt-7.5 inline-flex items-center gap-2.5 rounded-pill bg-paper px-6.5 py-3.5 font-semibold text-forest transition hover:-translate-y-0.5 hover:bg-ochre hover:text-on-ochre'>
              Start a conversation →
            </Link>
          </div>
        </Reveal>
      </section>

      <Section title='Away from the screen'>
        <p className='max-w-[56ch] text-[17.5px] leading-[1.72] text-ink-soft'>
          I read, swim and bake, and I exercise mostly to undo the effects of sitting still for a living. None of it is
          sophisticated, and all of it is better company than a build log.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className='border-t border-line py-14 md:py-19'>
      <Reveal variant='rv'>
        <div className='grid items-start gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14'>
          <h2 className='max-w-[18ch] font-display text-[clamp(28px,3.4vw,42px)] leading-[1.02] font-bold tracking-[-0.04em]'>
            {title}
          </h2>
          <div>{children}</div>
        </div>
      </Reveal>
    </section>
  );
}
