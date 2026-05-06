import Link from 'next/link';

type FooterRoute = {
  href: string;
  label: string;
  description: string;
};

const internalRoutes: FooterRoute[] = [
  {
    href: '/',
    label: 'Home',
    description: 'Project overview.',
  },
  {
    href: '/method/',
    label: 'Method',
    description: 'Model and objective.',
  },
  {
    href: '/data/',
    label: 'Data',
    description: 'Datasets and preprocessing.',
  },
  {
    href: '/metrics/',
    label: 'Metrics',
    description: 'Scoring definitions.',
  },
  {
    href: '/methods/',
    label: 'Benchmarks',
    description: 'Methods and tracks.',
  },
  {
    href: '/code/',
    label: 'Code',
    description: 'Repo and setup.',
  },
  {
    href: '/cite/',
    label: 'Cite',
    description: 'Citation info.',
  },
  {
    href: '/team/',
    label: 'Team',
    description: 'Authors and contact.',
  },
];

const externalLinks: FooterRoute[] = [
  {
    href: 'https://peterponyu.github.io/',
    label: 'PeterPonyu homepage',
    description: 'ZF Lab site.',
  },
  {
    href: 'https://peterponyu.github.io/scportal/',
    label: 'SCPortal',
    description: 'Single-cell portal.',
  },
  {
    href: 'https://github.com/PeterPonyu/GAHIB',
    label: 'GAHIB repository',
    description: 'Source code.',
  },
  {
    href: 'https://peterponyu.github.io/scccvgben-next/',
    label: 'scCCVGBen',
    description: 'Benchmark browser.',
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
        <div>
          <p className="font-serif text-base font-semibold text-slate-900">GAHIB</p>
          <p className="mt-1 text-sm text-slate-600">
            Graph-attention single-cell embeddings in Lorentz hyperbolic space.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="text-sm">
            <p className="mb-3 font-medium text-slate-700">Browse GAHIB</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {internalRoutes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="group block min-h-11 rounded-md px-2 py-2 no-underline transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <span className="font-medium text-slate-800 group-hover:text-brand-700">
                      {route.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                      {route.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-medium text-slate-700">Related links</p>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block min-h-11 rounded-md px-2 py-2 no-underline transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <span className="font-medium text-slate-800 group-hover:text-brand-700">
                      {link.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                      {link.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Code: MIT License · Content: CC BY 4.0 · Built with Next.js · Deployed on GitHub Pages.</span>
          <Link href="/results/" className="inline-flex min-h-11 items-center rounded-md px-2 text-amber-700 no-underline hover:bg-amber-100 hover:text-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
            Results not yet available
          </Link>
        </div>
      </div>
    </footer>
  );
}
