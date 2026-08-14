'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';

const presets = [
  { name: 'Clay', clay: '#C2401A', forest: '#174E33' },
  { name: 'Blue', clay: '#1F6FEB', forest: '#123C7A' },
  { name: 'Violet', clay: '#7A3FBF', forest: '#3E2168' },
  { name: 'Teal', clay: '#0F7B6C', forest: '#0A4A41' },
  { name: 'Crimson', clay: '#B3123C', forest: '#5E0A20' },
];

export default function Playground() {
  const [picked, setPicked] = useState(0);
  const [radius, setRadius] = useState(22);
  const [motion, setMotion] = useState(true);
  const [tokens, setTokens] = useState<string[][]>([]);
  const [copied, setCopied] = useState(false);

  function readTokens() {
    const cs = getComputedStyle(document.documentElement);
    setTokens(
      ['--clay', '--forest', '--ochre', '--paper', '--ink', '--r-card'].map((n) => [n, cs.getPropertyValue(n).trim()]),
    );
  }

  useEffect(() => {
    // Starts empty to match SSR output; reads the real computed values from
    // the DOM post-mount, then again whenever the theme/token set changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    readTokens();
    window.addEventListener('themechange', readTokens);
    return () => window.removeEventListener('themechange', readTokens);
  }, []);

  function apply(i: number) {
    const preset = presets[i];
    if (!preset) return;
    setPicked(i);
    document.documentElement.style.setProperty('--clay', preset.clay);
    document.documentElement.style.setProperty('--forest', preset.forest);
    window.dispatchEvent(new Event('themechange'));
    readTokens();
  }

  function setR(v: number) {
    setRadius(v);
    document.documentElement.style.setProperty('--r-card', `${v}px`);
    readTokens();
  }

  function toggleMotion(on: boolean) {
    setMotion(on);
    document.documentElement.classList.toggle('reduce', !on);
  }

  return (
    <section id='playground' className='px-[22px] py-16 md:px-10 md:py-25'>
      <div className='mx-auto max-w-[var(--maxw)]'>
        <div className='mb-12 flex flex-wrap items-end justify-between gap-10'>
          <Reveal variant='rvL'>
            <span className='mb-3.5 inline-block rounded-[var(--r-pill)] bg-[var(--clay)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.14em] text-[var(--on-clay)] uppercase'>
              02 / Playground
            </span>
            <h2 className='max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(32px,4vw,50px)] leading-none font-bold tracking-[-0.04em]'>
              Change this page
            </h2>
          </Reveal>
          <Reveal variant='rvR' className='max-w-[400px]'>
            <p className='text-[16px] text-[var(--ink-soft)]'>
              Design systems are just variables. Move these and watch every component follow.
            </p>
          </Reveal>
        </div>

        <Reveal variant='rvZ'>
          <div className='grid items-start gap-9 rounded-[var(--r-panel)] bg-[var(--forest)] p-6 text-[var(--on-forest)] md:grid-cols-2 md:p-9'>
            <div>
              <h3 className='font-[family-name:var(--font-display)] text-[26px] font-bold tracking-[-0.03em]'>Live design tokens</h3>
              <p className='mt-2.5 text-[16px] opacity-85'>
                The same mechanism I use on client sites. One set of variables, every component reading from it, so a rebrand
                becomes an afternoon instead of a rebuild.
              </p>

              <div className='mt-5.5'>
                <span className='mb-2.5 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase opacity-70'>Accent</span>
                <div className='flex flex-wrap gap-2.5'>
                  {presets.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => apply(i)}
                      aria-label={p.name}
                      aria-pressed={picked === i}
                      className={`h-10 w-10 cursor-pointer rounded-xl border-2 transition-transform hover:scale-110 ${picked === i ? 'border-[var(--on-forest)]' : 'border-transparent'}`}
                      style={{ background: p.clay }}
                    />
                  ))}
                </div>
              </div>

              <div className='mt-5.5'>
                <label htmlFor='radius' className='mb-2.5 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase opacity-70'>
                  Corner radius, {radius}px
                </label>
                <input id='radius' type='range' min={0} max={34} step={1} value={radius} onChange={(e) => setR(Number(e.target.value))} className='w-full accent-[var(--ochre)]' />
              </div>

              <div className='mt-5.5'>
                <span className='mb-2.5 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase opacity-70'>Motion</span>
                <label className='inline-flex cursor-pointer items-center gap-2.5 text-[15px]'>
                  <input type='checkbox' checked={motion} onChange={(e) => toggleMotion(e.target.checked)} />
                  Animations on
                </label>
              </div>
            </div>

            <div>
              <span className='mb-2.5 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase opacity-70'>Generated tokens</span>
              <div className='overflow-x-auto rounded-2xl border border-white/15 bg-black/20 p-4.5 font-[family-name:var(--font-mono)] text-[12px] leading-[1.9]'>
                {tokens.map(([k, v]) => (
                  <div key={k}>
                    {k}: <span className='text-[var(--ochre)]'>{v}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(tokens.map(([k, v]) => `${k}: ${v};`).join('\n'));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1600);
                }}
                className='mt-4 rounded-[var(--r-pill)] bg-[var(--ochre)] px-6 py-3 text-[15px] font-semibold text-[var(--on-ochre)]'
              >
                {copied ? 'Copied ✓' : 'Copy tokens'}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
