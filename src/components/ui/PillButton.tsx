import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const variants = {
  solid: 'bg-clay text-on-clay hover:bg-ink hover:text-paper',
  outline: 'border border-line hover:border-ink hover:bg-ink hover:text-paper',
} as const;

type Variant = keyof typeof variants;

type Props = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export function PillButton({ href, variant = 'solid', className = '', children, ...props }: Props) {
  const cls = `rounded-pill px-5.5 py-3 text-[15px] font-medium transition ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`cursor-pointer ${cls}`} {...props}>
      {children}
    </button>
  );
}
