'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Starts 'light' to match SSR output; the blocking script in the root
  // layout already sets the real theme on the DOM before paint, this just
  // syncs React state to it post-mount without risking a hydration mismatch.
  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ?? 'light';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
    window.dispatchEvent(new Event('themechange'));
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className='grid h-9.5 w-9.5 place-items-center rounded-pill border border-line bg-paper-2 text-[15px] text-ink transition duration-250 hover:-translate-y-0.5 hover:border-clay hover:bg-clay hover:text-on-clay'
    >
      ◐
    </button>
  );
}
