import Link from 'next/link';
import { Hero } from '@/components/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">In brief</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/method/"
            className="block rounded-lg border border-slate-200 bg-white p-5 no-underline transition hover:border-brand-300 hover:shadow-sm"
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Method</h3>
            <p className="text-sm text-slate-600">
              Three losses shape the latent space: reconstruction, information
              bottleneck, and a Lorentz hyperbolic distance that anchors the
              manifold so radial position encodes hierarchy.
            </p>
          </Link>
          <Link
            href="/data/"
            className="block rounded-lg border border-slate-200 bg-white p-5 no-underline transition hover:border-brand-300 hover:shadow-sm"
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Data</h3>
            <p className="text-sm text-slate-600">
              Evaluated on seven publicly available single-cell datasets
              spanning hematopoiesis, neuronal development, gastrulation, and
              pancreatic differentiation.
            </p>
          </Link>
          <Link
            href="/code/"
            className="block rounded-lg border border-slate-200 bg-white p-5 no-underline transition hover:border-brand-300 hover:shadow-sm"
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Code</h3>
            <p className="text-sm text-slate-600">
              MIT-licensed PyTorch implementation. Install with{' '}
              <code className="rounded bg-slate-100 px-1 py-0.5">pip install -e .</code>{' '}
              and inspect the <code className="rounded bg-slate-100 px-1 py-0.5">gahib</code>{' '}
              package on GitHub.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
