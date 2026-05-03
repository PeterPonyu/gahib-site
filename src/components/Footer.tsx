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
    description: 'Preview-safe project overview and public route context.',
  },
  {
    href: '/method/',
    label: 'Method',
    description: 'Model objective, graph attention, and hyperbolic geometry notes.',
  },
  {
    href: '/data/',
    label: 'Data',
    description: 'Public cohort inventory and preprocessing summary.',
  },
  {
    href: '/metrics/',
    label: 'Metrics',
    description: 'Evaluation definitions and paired-testing policy.',
  },
  {
    href: '/methods/',
    label: 'Benchmarks',
    description: 'Compared method families and benchmark tracks.',
  },
  {
    href: '/code/',
    label: 'Code',
    description: 'Reference implementation, install notes, and repository link.',
  },
  {
    href: '/cite/',
    label: 'Cite',
    description: 'Current unpublished citation metadata.',
  },
  {
    href: '/team/',
    label: 'Team',
    description: 'Author, lab context, and contact routes.',
  },
];

const externalLinks: FooterRoute[] = [
  {
    href: 'https://peterponyu.github.io/',
    label: 'PeterPonyu homepage',
    description: 'Lab route graph and related project surfaces.',
  },
  {
    href: 'https://peterponyu.github.io/scportal/',
    label: 'SCPortal',
    description: 'Single-cell discovery hub for datasets, methods, and benchmarks.',
  },
  {
    href: 'https://github.com/PeterPonyu/GAHIB',
    label: 'GAHIB repository',
    description: 'MIT-licensed source code and issue tracker.',
  },
  {
    href: 'https://peterponyu.github.io/scccvgben-next/',
    label: 'scCCVGBen',
    description: 'External benchmark explorer for single-cell comparison context.',
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
        <div>
          <p className="font-serif text-base font-semibold text-slate-900">GAHIB</p>
          <p className="mt-1 text-sm text-slate-600">
            Single-cell graph-attention VAE with information bottleneck and hyperbolic geometry.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="text-sm">
            <p className="mb-3 font-medium text-slate-700">Project routes</p>
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
            <p className="mb-3 font-medium text-slate-700">External context</p>
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
            Results status: gated until journal acceptance.
          </Link>
        </div>
      </div>
    </footer>
  );
}
