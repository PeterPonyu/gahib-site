import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-base font-semibold text-slate-900">GAHIB</p>
          <p className="mt-1 text-sm text-slate-600">
            Single-cell graph-attention VAE with information bottleneck and hyperbolic geometry.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium text-slate-700">Project</p>
          <ul className="space-y-1 text-slate-600">
            <li><Link href="/method/" className="text-slate-600 no-underline hover:text-brand-700">Method</Link></li>
            <li><Link href="/data/" className="text-slate-600 no-underline hover:text-brand-700">Data</Link></li>
            <li><Link href="/code/" className="text-slate-600 no-underline hover:text-brand-700">Code</Link></li>
            <li><Link href="/cite/" className="text-slate-600 no-underline hover:text-brand-700">Cite</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium text-slate-700">Lab</p>
          <ul className="space-y-1 text-slate-600">
            <li><a href="https://peterponyu.github.io/" rel="noopener" className="text-slate-600 no-underline hover:text-brand-700">Homepage</a></li>
            <li><a href="https://peterponyu.github.io/scportal/" rel="noopener" className="text-slate-600 no-underline hover:text-brand-700">SCPortal</a></li>
            <li><a href="https://github.com/PeterPonyu" rel="noopener" className="text-slate-600 no-underline hover:text-brand-700">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-3 text-xs text-slate-500">
          Code: MIT License · Content: CC BY 4.0 · Built with Next.js · Deployed on GitHub Pages.
        </div>
      </div>
    </footer>
  );
}
