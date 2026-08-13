'use client';

import { useInView } from 'react-intersection-observer';
import type { ReactNode } from 'react';

type Variant = 'rv' | 'rvL' | 'rvR' | 'rvZ';

export function Reveal({
  children,
  variant = 'rv',
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'p';
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  return (
    <Tag ref={ref} className={`${variant} ${inView ? 'in' : ''} ${className}`}>
      {children}
    </Tag>
  );
}

// Delays are nth-child rules in globals.css.
export function Stagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <div ref={ref} className={`stg ${inView ? 'in' : ''} ${className}`}>
      {children}
    </div>
  );
}
