'use client';

import { useEffect, useState } from 'react';

const items = ['React', 'Next.js', '·', 'TypeScript', 'React Native', '·', 'Tailwind CSS', 'Redux', '·', 'REST APIs', 'Accessibility', '·', 'SEO', 'Vercel', '·'];

export default function Marquee() {
  const [paused, setPaused] = useState(false);

  // WCAG 2.2.2 needs a pause for anything auto-moving past five seconds.
  // Starts unpaused to match SSR output, then corrects post-mount once
  // matchMedia is available, rather than risking a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
  }, []);

  return (
    <div className={`marquee relative mt-14 overflow-hidden border-y-2 border-[var(--ink)] bg-[var(--ochre-soft)] py-3.5 whitespace-nowrap ${paused ? 'paused' : ''}`}>
      <button
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Resume the scrolling tech list' : 'Pause the scrolling tech list'}
        className='absolute top-1/2 right-2 z-2 -translate-y-1/2 rounded-[var(--r-pill)] border border-[var(--ochre-ink)] bg-[var(--ochre-soft)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[9.5px] tracking-[0.08em] text-[var(--ochre-ink)] uppercase hover:bg-[var(--ochre)] hover:text-[var(--on-ochre)]'
      >
        {paused ? 'Play' : 'Pause'}
      </button>
      <div className='marquee-inner inline-flex gap-10 font-[family-name:var(--font-mono)] text-[11.5px] tracking-[0.1em] text-[var(--ochre-ink)] uppercase'>
        {[...items, ...items].map((t, i) => (
          <span key={i} className={t === '·' ? 'text-[var(--clay)]' : ''}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
