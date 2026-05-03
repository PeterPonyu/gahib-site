import { Hero } from '@/components/Hero';
import { JourneyCard } from '@/components/JourneyCard';
import { Ecosystem } from '@/components/Ecosystem';

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-5xl px-4 py-14">
        <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
          The journey
        </span>
        <h2 className="mb-8 text-2xl font-semibold text-slate-900">
          Pick a route through the project
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <JourneyCard number="01" title="Method" href="/method/" cta="Read the architecture">
            Three losses shape the latent: reconstruction, information bottleneck,
            and a Lorentz hyperbolic distance that anchors a hierarchy-aware
            manifold.
          </JourneyCard>
          <JourneyCard number="02" title="Data" href="/data/" cta="See the datasets">
            The 53-dataset evaluation cohort spans cancer and development, with
            identifiers grouped by the same taxonomy used in the manuscript.
          </JourneyCard>
          <JourneyCard number="03" title="Metrics" href="/metrics/" cta="Inspect the metrics">
            Twenty metrics cover clustering quality, dimensionality-reduction
            preservation, and intrinsic latent-space diagnostics.
          </JourneyCard>
          <JourneyCard number="04" title="Benchmarks" href="/methods/" cta="Review the design">
            Deep-learning, classical, geometric VAE, disentanglement, encoder,
            graph-convolution, and robustness tracks share one protocol.
          </JourneyCard>
          <JourneyCard number="05" title="Code" href="/code/" cta="Install and run">
            MIT-licensed PyTorch reference implementation with a familiar
            <code className="ml-1 rounded bg-slate-100 px-1 py-0.5">scanpy</code>{' '}
            entry-point.
          </JourneyCard>
          <JourneyCard number="06" title="Cite" href="/cite/" cta="Copy the BibTeX">
            Pre-publication citation stub today; full <code className="rounded bg-slate-100 px-1 py-0.5">@article</code>{' '}
            entry on acceptance.
          </JourneyCard>
        </div>
      </section>
      <Ecosystem />
    </>
  );
}
