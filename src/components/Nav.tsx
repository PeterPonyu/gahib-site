import Link from 'next/link';
import { PREPUB } from '@/lib/prepub';

const links = [
  { href: '/', label: 'Home' },
  { href: '/method/', label: 'Method' },
  { href: '/data/', label: 'Data' },
  { href: '/results/', label: 'Results' },
  { href: '/code/', label: 'Code' },
  { href: '/cite/', label: 'Cite' },
  { href: '/team/', label: 'Team' },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="font-serif text-lg font-semibold text-slate-900">GAHIB</span>
          {PREPUB && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-amber-800">
              preview
            </span>
          )}
        </Link>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-slate-700 no-underline hover:text-brand-700">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
