import Image from 'next/image';
import Link from 'next/link';
import { SITE_TAGLINE_PREPUB } from '@/lib/prepub';

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50/60 to-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-5 md:py-20">
        <div className="md:col-span-3">
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/gahib-site/badges/GAHIB.svg"
              alt=""
              width={48}
              height={48}
              unoptimized
              priority
            />
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
              ZF Lab · Single-cell representation learning
            </span>
          </div>
          <h1 className="mb-5 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            GAHIB
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-700">
            {SITE_TAGLINE_PREPUB}
          </p>
          <div className="mb-8 grid max-w-xl grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg border border-white/80 bg-white/80 p-3 shadow-sm">
              <span className="block text-2xl font-semibold text-slate-950">53</span>
              <span className="text-slate-600">datasets</span>
            </div>
            <div className="rounded-lg border border-white/80 bg-white/80 p-3 shadow-sm">
              <span className="block text-2xl font-semibold text-slate-950">20</span>
              <span className="text-slate-600">metrics</span>
            </div>
            <div className="rounded-lg border border-white/80 bg-white/80 p-3 shadow-sm">
              <span className="block text-2xl font-semibold text-slate-950">11</span>
              <span className="text-slate-600">tracks</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/method/"
              className="group inline-flex min-h-11 items-center gap-1 rounded-md bg-brand-600 px-4 text-sm font-medium text-white no-underline shadow-sm transition hover:gap-2 hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              How it works
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/data/"
              className="group inline-flex min-h-11 items-center gap-1 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 no-underline transition hover:gap-2 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Explore data
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="https://github.com/PeterPonyu/GAHIB"
              rel="noopener"
              className="group inline-flex min-h-11 items-center gap-1 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 no-underline transition hover:gap-2 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              GitHub
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
              Companion-site map
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Metadata-first preview</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              The live site documents the evaluation cohort, metric suite, benchmark tracks, code entry points, and release state without duplicating the manuscript result figures.
            </p>
            <div className="mt-5 grid gap-2 text-sm">
              <Link href="/data/" className="inline-flex min-h-11 items-center rounded-md border border-slate-200 bg-slate-50 px-3 no-underline hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                <span className="font-semibold text-slate-950">/data</span>
                <span className="ml-2 text-slate-600">53-dataset inventory</span>
              </Link>
              <Link href="/metrics/" className="inline-flex min-h-11 items-center rounded-md border border-slate-200 bg-slate-50 px-3 no-underline hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                <span className="font-semibold text-slate-950">/metrics</span>
                <span className="ml-2 text-slate-600">20 metric definitions</span>
              </Link>
              <Link href="/methods/" className="inline-flex min-h-11 items-center rounded-md border border-slate-200 bg-slate-50 px-3 no-underline hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                <span className="font-semibold text-slate-950">/methods</span>
                <span className="ml-2 text-slate-600">benchmark design</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
