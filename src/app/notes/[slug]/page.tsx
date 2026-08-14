import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import portrait from '@public/maria.png';
import { getNote, publishedNotes, notes } from '@/content/notes';
import { bodies } from '@/content/note-bodies';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return publishedNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: { type: 'article', title: note.title, description: note.description, publishedTime: note.date },
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  const Body = bodies[slug];
  if (!note || !note.published || !Body) notFound();

  const idx = notes.findIndex((n) => n.slug === slug);
  const next = notes[idx + 1];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: note.title,
    description: note.description,
    datePublished: note.date,
    author: { '@type': 'Person', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/notes/${note.slug}`,
  };

  return (
    <article className='mx-auto max-w-190 px-5.5 pt-13 md:px-10'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href='/notes' className='mb-7.5 inline-block font-mono text-[11px] tracking-[0.08em] text-clay uppercase'>
        ← All notes
      </Link>

      <span className='mb-3 inline-block rounded-pill bg-clay-soft px-2.5 py-1 font-mono text-[9.5px] tracking-[0.09em] text-clay uppercase'>
        {note.category}
      </span>
      <h1 className='max-w-[19ch] font-display text-[clamp(34px,5vw,58px)] leading-[0.98] font-extrabold tracking-[-0.045em]'>
        {note.title}
      </h1>
      <p className='mt-5.5 max-w-[60ch] text-[21px] leading-[1.6] text-ink-soft'>{note.description}</p>

      <div className='my-9 flex flex-wrap gap-5.5 border-b-2 border-ink pt-6.5 pb-5 font-mono text-[10.5px] tracking-[0.08em] text-ink-faint uppercase'>
        <span>{new Date(note.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span>{note.readingMinutes} minute read</span>
        <span>{site.name}</span>
        <span>Kampala</span>
      </div>

      <div className='text-[18.5px] leading-[1.78] text-ink-soft'>
        <Body />
      </div>

      <aside className='mt-14 flex flex-col items-start gap-5 rounded-card border border-line-soft bg-paper-2 p-6.5 md:flex-row md:items-center'>
        <div className='h-19 w-19 shrink-0 overflow-hidden rounded-full border border-line bg-paper-3'>
          <Image src={portrait} alt={site.name} sizes='76px' className='h-full w-full object-cover object-top' />
        </div>
        <div>
          <h2 className='font-display text-[20px] font-bold tracking-[-0.02em]'>{site.name}</h2>
          <p className='mt-1.5 max-w-[52ch] text-[15.5px] text-ink-soft'>
            Front-end developer in Kampala. React, Next.js and TypeScript, mostly for people who have something complicated
            to explain to strangers on the internet.{' '}
            <Link href='/#work' className='border-b-2 border-clay font-medium text-clay'>
              See the work
            </Link>
          </p>
        </div>
      </aside>

      {next && (
        <div className='mt-16 border-t-2 border-ink pt-8.5 pb-22'>
          <span className='font-mono text-[10.5px] tracking-[0.1em] text-ink-faint uppercase'>
            Next note
          </span>
          <Link
            href={next.published ? `/notes/${next.slug}` : '/notes'}
            className='mt-3.5 flex items-baseline justify-between gap-5 font-display text-[28px] font-bold tracking-[-0.03em] transition-colors hover:text-clay'
          >
            {next.title} <span aria-hidden='true'>→</span>
          </Link>
        </div>
      )}
    </article>
  );
}
