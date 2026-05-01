import Link from 'next/link';
import type { ReactNode } from 'react';

type JourneyCardProps = {
  number: string;
  title: string;
  href: string;
  cta: string;
  children: ReactNode;
};

export function JourneyCard({ number, title, href, cta, children }: JourneyCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-slate-200 bg-white p-6 no-underline transition hover:border-brand-400 hover:shadow-md"
    >
      <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
        {number}
      </span>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-slate-600">{children}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 transition group-hover:gap-2">
        {cta}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default JourneyCard;
