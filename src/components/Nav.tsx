import Link from 'next/link';
import { PREPUB } from '@/lib/prepub';

const links = [
  { href: '/', label: 'Home' },
  { href: '/method/', label: 'Method' },
  { href: '/data/', label: 'Data' },
  { href: '/metrics/', label: 'Metrics' },
  { href: '/methods/', label: 'Benchmarks' },
  { href: '/code/', label: 'Code' },
  { href: '/cite/', label: 'Cite' },
  { href: '/team/', label: 'Team' },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <span className="font-serif text-lg font-semibold text-slate-900">GAHIB</span>
          {PREPUB && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-amber-800">
              preview
            </span>
          )}
        </Link>
        <ul className="flex w-full min-w-0 flex-wrap items-center gap-1 text-sm text-slate-600 sm:w-auto sm:justify-end">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex min-h-11 items-center rounded-md px-2 text-slate-700 no-underline transition hover:bg-slate-100 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
