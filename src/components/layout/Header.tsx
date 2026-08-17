'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';
import ThemeToggle from './ThemeToggle';
import MobileSheet from './MobileSheet';
import { IconButton } from '@/components/ui/IconButton';

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
        className={`sticky top-0 z-60 border-b backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 ${
          stuck ? 'border-line' : 'border-transparent'
        }`}
        style={{ background: 'color-mix(in srgb, var(--paper) 84%, transparent)' }}
      >
        <div className='mx-auto flex h-18.5 max-w-site items-center justify-between px-5.5 md:px-10'>
          <Link href='/' className='font-display text-[19px] font-extrabold tracking-[-0.03em]'>
            maria<em className='font-serif font-normal text-clay'>.</em>
          </Link>

          <nav className='hidden gap-7 text-[15px] text-ink-soft md:flex'>
            {nav.map((n) => {
              const active = n.href.startsWith('/#') ? pathname === '/' : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`group relative py-1 transition-colors hover:text-ink ${active ? 'text-ink' : ''}`}
                >
                  {n.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-clay transition-all duration-300 group-hover:w-full ${
                      active ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className='flex items-center gap-2.5'>
            <ThemeToggle />
            <IconButton
              onClick={() => setOpen(true)}
              aria-label='Open menu'
              aria-expanded={open}
              className='md:hidden'
            >
              ☰
            </IconButton>
            <Link
              href='/contact'
              className='hidden rounded-pill bg-forest px-5 py-2.5 text-[14px] font-medium text-on-forest transition duration-250 hover:-translate-y-0.5 hover:bg-clay hover:text-on-clay md:inline-block'
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
