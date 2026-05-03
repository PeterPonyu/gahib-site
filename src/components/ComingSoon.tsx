import Link from 'next/link';

export function ComingSoon({ reason }: { reason?: string }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-2xl border border-amber-200 bg-[radial-gradient(circle_at_top_left,_#fef3c7_0,_transparent_32%),linear-gradient(180deg,_#fffbeb_0%,_#ffffff_76%)] p-8 text-center shadow-sm md:p-12">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-amber-700">
          Preview gate
        </p>
        <h1 className="mb-4 text-4xl font-semibold text-slate-950">Results release pending</h1>
        <p className="mx-auto mb-8 max-w-2xl text-slate-700">
          {reason ?? 'Detailed results, benchmarks, and figures will be released upon journal acceptance.'}
        </p>
        <div className="mx-auto grid max-w-3xl gap-3 text-left md:grid-cols-3">
          <Link href="/data/" className="rounded-lg border border-slate-200 bg-white p-4 text-sm no-underline shadow-sm hover:border-brand-400">
            <span className="font-semibold text-slate-950">Dataset inventory</span>
            <span className="mt-1 block leading-relaxed text-slate-600">Review the 53 public dataset metadata entries.</span>
          </Link>
          <Link href="/metrics/" className="rounded-lg border border-slate-200 bg-white p-4 text-sm no-underline shadow-sm hover:border-brand-400">
            <span className="font-semibold text-slate-950">Metric definitions</span>
            <span className="mt-1 block leading-relaxed text-slate-600">Inspect the 20 evaluation metrics before result release.</span>
          </Link>
          <Link href="/methods/" className="rounded-lg border border-slate-200 bg-white p-4 text-sm no-underline shadow-sm hover:border-brand-400">
            <span className="font-semibold text-slate-950">Benchmark design</span>
            <span className="mt-1 block leading-relaxed text-slate-600">See which benchmark families are documented now.</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ComingSoon;
