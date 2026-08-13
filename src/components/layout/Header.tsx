'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';
import ThemeToggle from './ThemeToggle';
import MobileSheet from './MobileSheet';

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-60 border-b backdrop-blur-[12px] backdrop-saturate-150 transition-colors duration-300 ${
          stuck ? 'border-[var(--line)]' : 'border-transparent'
        }`}
        style={{ background: 'color-mix(in srgb, var(--paper) 84%, transparent)' }}
      >
        <div className='mx-auto flex h-[74px] max-w-[var(--maxw)] items-center justify-between px-[22px] md:px-10'>
          <Link href='/' className='font-[family-name:var(--font-display)] text-[19px] font-extrabold tracking-[-0.03em]'>
            maria<em className='font-[family-name:var(--font-serif)] font-normal text-[var(--clay)]'>.</em>
          </Link>

          <nav className='hidden gap-7 text-[15px] text-[var(--ink-soft)] md:flex'>
            {nav.map((n) => {
              const active = n.href.startsWith('/#') ? pathname === '/' : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`group relative py-1 transition-colors hover:text-[var(--ink)] ${active ? 'text-[var(--ink)]' : ''}`}
                >
                  {n.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--clay)] transition-all duration-300 group-hover:w-full ${
                      active ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className='flex items-center gap-2.5'>
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-label='Open menu'
              aria-expanded={open}
              className='grid h-[38px] w-[38px] place-items-center rounded-[var(--r-pill)] border border-[var(--line)] bg-[var(--paper-2)] text-[15px] text-[var(--ink)] md:hidden'
            >
              ☰
            </button>
            <Link
              href='/contact'
              className='hidden rounded-[var(--r-pill)] bg-[var(--forest)] px-5 py-2.5 text-[14px] font-medium text-[var(--on-forest)] transition duration-250 hover:-translate-y-0.5 hover:bg-[var(--clay)] hover:text-[var(--on-clay)] md:inline-block'
            >
              Say hi
            </Link>
          </div>
        </div>
      </header>
      <MobileSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
