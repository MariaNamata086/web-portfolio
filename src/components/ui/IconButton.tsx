import type { ButtonHTMLAttributes } from 'react';

export function IconButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`grid h-9.5 w-9.5 place-items-center rounded-pill border border-line bg-paper-2 text-[15px] text-ink transition duration-250 hover:-translate-y-0.5 hover:border-clay hover:bg-clay hover:text-on-clay ${className}`}
      {...props}
    />
  );
}
