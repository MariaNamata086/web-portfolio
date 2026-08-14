import type { ReactNode } from 'react';

export function P({ children }: { children: ReactNode }) {
  return <p className='mb-6.5'>{children}</p>;
}
export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className='mt-12 mb-4.5 max-w-[24ch] font-display text-[30px] font-bold tracking-[-0.03em] text-ink'>
      {children}
    </h2>
  );
}
export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className='mt-9 mb-3 font-display text-[22px] font-semibold text-ink'>{children}</h3>
  );
}
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className='rounded-md border border-line-soft bg-paper-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink'>
      {children}
    </code>
  );
}
export function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className='my-9.5 border-l-4 border-clay pl-6 font-serif text-[26px] leading-[1.42] text-ink italic'>
      {children}
    </blockquote>
  );
}
export function MetricBand({ items }: { items: { value: string; label: string }[] }) {
  const tints = [
    'bg-clay text-on-clay',
    'bg-forest text-on-forest',
    'bg-ochre text-on-ochre',
    'bg-plum text-[#FFF0F5]',
  ];
  return (
    <div className='my-9 grid gap-3 sm:grid-cols-2 md:grid-cols-4'>
      {items.map((m, i) => (
        <div key={m.label} className={`rounded-2xl p-5 ${tints[i % 4]}`}>
          <b className='block font-display text-[28px] font-bold tracking-[-0.03em]'>{m.value}</b>
          <span className='mt-1.5 block font-mono text-[10px] tracking-[0.07em] uppercase opacity-90'>
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}
export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className='my-9 rounded-2xl bg-forest-soft px-6.5 py-6 text-[17px] text-ink'>
      <b className='mb-2 block font-display text-[18px] font-semibold'>{title}</b>
      {children}
    </div>
  );
}
export function Figure({ caption, placeholder }: { caption: string; placeholder: string }) {
  return (
    <figure className='my-9.5'>
      <div className='grid aspect-video place-items-center rounded-media border border-line bg-paper-2 p-5 text-center font-mono text-[10.5px] tracking-[0.08em] text-ink-faint uppercase'>
        {placeholder}
      </div>
      <figcaption className='mt-3 text-[14.5px] text-ink-faint italic'>{caption}</figcaption>
    </figure>
  );
}
