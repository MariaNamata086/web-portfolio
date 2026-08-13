'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= to) clearInterval(id);
    }, 140);
    return () => clearInterval(id);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {n >= to ? suffix : ''}
    </span>
  );
}
