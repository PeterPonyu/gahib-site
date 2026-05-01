import { ComingSoon } from '@/components/ComingSoon';
import Content from '@/results-content';
import { PREPUB } from '@/lib/prepub';

export default function ResultsPage() {
  if (PREPUB) {
    return <ComingSoon reason="Detailed results, benchmarks, and interpretability figures will be released upon journal acceptance." />;
  }
  return (
    <article className="prose mx-auto max-w-3xl px-4 py-12">
      <Content />
    </article>
  );
}
