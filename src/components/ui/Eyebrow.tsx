import type { ReactNode } from 'react';

const tones = {
  clay: 'bg-clay text-on-clay',
  ochre: 'bg-ochre text-on-ochre',
  danger: 'bg-danger-soft text-danger',
} as const;

export function Eyebrow({
  tone = 'clay',
  className = '',
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-block rounded-pill px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
