import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className='mt-24 border-t-2 border-ink py-12'>
      <div className='mx-auto flex max-w-site flex-wrap justify-between gap-6 px-[22px] font-mono text-[11px] tracking-[0.06em] text-ink-faint uppercase md:px-10'>
        <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
        <span>Built with Next.js and Tailwind. Designed and coded by me, obviously.</span>
      </div>
    </footer>
  );
}
