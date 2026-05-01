type Sibling = {
  name: string;
  href: string;
  description: string;
};

const siblings: Sibling[] = [
  {
    name: 'peterponyu.github.io',
    href: 'https://peterponyu.github.io/',
    description: 'Lab homepage — single-cell computational biology.',
  },
  {
    name: 'SCPortal',
    href: 'https://peterponyu.github.io/scportal/',
    description: 'Discovery hub for the lab’s flagship single-cell projects.',
  },
  {
    name: 'scCCVGBen',
    href: 'https://peterponyu.github.io/scccvgben-next/',
    description: '200-dataset single-cell CCVGAE benchmark and explorer.',
  },
  {
    name: 'iAODE',
    href: 'https://github.com/PeterPonyu/iAODE',
    description: 'Interpretable accessibility ODE-VAE for scATAC-seq.',
  },
  {
    name: 'LiVAE',
    href: 'https://github.com/PeterPonyu/LiVAE',
    description: 'Lorentz-irecon VAE for single-cell multi-omics.',
  },
];

export function Ecosystem() {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
          Ecosystem
        </span>
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Connected ZF Lab projects
        </h2>
        <p className="mb-8 max-w-2xl text-sm text-slate-600">
          GAHIB is part of a larger family of single-cell representation-learning
          and benchmarking projects. Visit the discovery hub for a guided tour.
        </p>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {siblings.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                rel="noopener"
                className="group flex h-full flex-col rounded-md border border-slate-200 bg-white p-4 no-underline transition hover:border-brand-400 hover:shadow-sm"
              >
                <span className="mb-1 text-sm font-semibold text-slate-900">
                  {s.name}
                </span>
                <span className="flex-1 text-xs leading-relaxed text-slate-600">
                  {s.description}
                </span>
                <span className="mt-3 text-xs font-medium text-brand-700 group-hover:underline">
                  Visit →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
