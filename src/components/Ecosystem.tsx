import Link from 'next/link';

type NetworkNode = {
  name: string;
  role: string;
  href: string;
  description: string;
  badge: string;
};

type RelatedLink = {
  name: string;
  href: string;
  detail: string;
};

const networkNodes: NetworkNode[] = [
  {
    name: 'Homepage',
    role: 'ZF Lab home',
    href: 'https://peterponyu.github.io/',
    description: 'ZF Lab projects, papers, and related links.',
    badge: 'public index',
  },
  {
    name: 'SCPortal',
    role: 'Discovery hub',
    href: 'https://peterponyu.github.io/scportal/',
    description: 'Single-cell datasets, benchmarks, models, and companion sites.',
    badge: 'hub',
  },
  {
    name: 'GAHIB',
    role: 'Project site',
    href: '/',
    description: 'Method, data, metrics, and code for the GAHIB project.',
    badge: 'project site',
  },
  {
    name: 'GAHIB repository',
    role: 'Code',
    href: 'https://github.com/PeterPonyu/GAHIB',
    description: 'MIT-licensed PyTorch source and experiment entry points.',
    badge: 'code',
  },
];

const relatedLinks: RelatedLink[] = [
  {
    name: 'LAIOR Benchmarks',
    href: 'https://peterponyu.github.io/liora-ui/',
    detail: 'Benchmark dashboard and metric references.',
  },
  {
    name: 'iAODE Pages',
    href: 'https://peterponyu.github.io/iAODE/',
    detail: 'Single-cell dataset browser and project pages.',
  },
  {
    name: 'scCCVGBen',
    href: 'https://peterponyu.github.io/scccvgben-next/',
    detail: 'Related single-cell benchmark explorer.',
  },
  {
    name: 'LiVAE',
    href: 'https://github.com/PeterPonyu/LiVAE',
    detail: 'Lorentz VAE reference implementation for multi-omics work.',
  },
];

export function Ecosystem() {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
          <div>
            <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
              Related work
            </span>
            <h2 className="text-2xl font-semibold text-slate-900">
              GAHIB and related single-cell resources
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
              GAHIB connects to the PeterPonyu homepage and SCPortal alongside
              related single-cell method and benchmark resources. These links
              place the project in a broader dataset, benchmark, and code
              context.
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            <p className="font-semibold">How to use these links</p>
            <p className="mt-1">
              GAHIB is the project-specific site; the other links point to
              broader lab, dataset, and benchmark resources.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {networkNodes.map((node) => {
            const className = 'group flex min-h-48 flex-col rounded-md border border-slate-200 bg-white p-4 no-underline shadow-sm transition hover:border-brand-400 hover:shadow-md';
            const content = (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[0.7rem] font-medium uppercase tracking-widest text-brand-600">
                    {node.role}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-slate-600">
                    {node.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-950">{node.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {node.description}
                </p>
                <span className="mt-4 text-sm font-medium text-brand-700 group-hover:underline">
                  Open link
                </span>
              </>
            );

            if (node.href.startsWith('http')) {
              return (
                <a
                  key={node.href}
                  href={node.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={node.href} href={node.href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
                Related resources
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Single-cell methods and benchmark context
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              These links give context for the method and benchmarks across
              related single-cell projects.
            </p>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-md border border-slate-200 bg-slate-50 px-4 py-3 no-underline transition hover:border-brand-400 hover:bg-white"
                >
                  <span className="text-sm font-semibold text-slate-950">{link.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                    {link.detail}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
