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
      className='grid h-[38px] w-[38px] place-items-center rounded-[var(--r-pill)] border border-[var(--line)] bg-[var(--paper-2)] text-[15px] text-[var(--ink)] transition duration-250 hover:-translate-y-0.5 hover:border-[var(--clay)] hover:bg-[var(--clay)] hover:text-[var(--on-clay)]'
    >
      ◐
    </button>
  );
}
