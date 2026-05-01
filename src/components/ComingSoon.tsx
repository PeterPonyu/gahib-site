import Link from 'next/link';

export function ComingSoon({ reason }: { reason?: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="mb-4 text-3xl font-semibold text-slate-900">Coming soon</h1>
      <p className="mb-6 text-slate-700">
        {reason ?? 'Detailed results, benchmarks, and figures will be released upon journal acceptance.'}
      </p>
      <p className="text-sm text-slate-500">
        Until then,{' '}
        <Link href="/method/">read about the method</Link> or{' '}
        <Link href="/code/">explore the code</Link>.
      </p>
    </section>
  );
}

export default ComingSoon;
