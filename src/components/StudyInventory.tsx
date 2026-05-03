import {
  benchmarkFamilies,
  datasetDomains,
  metricGroups,
  preprocessingWorkflow,
  statisticalTestingNotes,
  studyScale,
} from '@/lib/study-metadata';

function DirectionBadge({ direction }: { direction: 'higher' | 'lower' | 'diagnostic' }) {
  const label = direction === 'higher' ? 'higher' : direction === 'lower' ? 'lower' : 'diagnostic';
  return (
    <span className="inline-flex rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
      {label}
    </span>
  );
}


function CountBadge({ value }: { value: string }) {
  return (
    <span className="rounded bg-brand-50 px-2 py-1 text-sm font-semibold text-brand-700">
      {value}
    </span>
  );
}

export function StudyScope() {
  return (
    <section className="my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {studyScale.map((item) => (
        <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium text-slate-600">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.detail}</p>
        </div>
      ))}
    </section>
  );
}

export function DatasetInventory() {
  return (
    <section className="my-10 space-y-8">
      {datasetDomains.map((domain) => {
        const tone = domain.name === 'Cancer'
          ? 'border-red-200 bg-red-50/40 text-red-900'
          : 'border-emerald-200 bg-emerald-50/40 text-emerald-900';

        return (
          <section key={domain.name} className={`rounded-lg border p-5 ${tone}`}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{domain.name}</h2>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-700">
                  {domain.description}
                </p>
              </div>
              <CountBadge value={`${domain.count} datasets`} />
            </div>
            <div className="overflow-x-auto rounded-md border border-white/70 bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-600">
                  <tr>
                    <th scope="col" className="px-4 py-3">Subcategory</th>
                    <th scope="col" className="px-4 py-3">Count</th>
                    <th scope="col" className="px-4 py-3">Dataset identifiers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {domain.categories.map((category) => (
                    <tr key={category.name}>
                      <td className="w-56 px-4 py-3 align-top">
                        <p className="font-semibold text-slate-900">{category.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">{category.description}</p>
                      </td>
                      <td className="px-4 py-3 align-top font-semibold text-slate-900">
                        {category.datasets.length}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-wrap gap-1.5">
                          {category.datasets.map((dataset) => (
                            <span
                              key={dataset}
                              className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700"
                            >
                              {dataset}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </section>
  );
}

export function PreprocessingList() {
  return (
    <section className="my-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-semibold text-slate-900">Shared preprocessing</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {preprocessingWorkflow.map((step) => (
          <li key={step} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
            {step}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MetricInventory() {
  return (
    <section className="my-10 space-y-6">
      {metricGroups.map((group) => (
        <section key={group.name} className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{group.name}</h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">
                {group.description}
              </p>
            </div>
            <CountBadge value={`${group.count} metrics`} />
          </div>
          <div className="overflow-x-auto rounded-md border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3">Metric</th>
                  <th scope="col" className="px-4 py-3">Direction</th>
                  <th scope="col" className="px-4 py-3">Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {group.metrics.map((metric) => (
                  <tr key={metric.name}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{metric.name}</td>
                    <td className="px-4 py-3"><DirectionBadge direction={metric.direction} /></td>
                    <td className="px-4 py-3 leading-relaxed">{metric.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </section>
  );
}

export function StatisticalTestingNotes() {
  return (
    <section className="my-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
      <h2 className="text-xl font-semibold text-slate-900">Statistical testing</h2>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
        {statisticalTestingNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}

export function MethodInventory() {
  return (
    <section className="my-10 space-y-5">
      {benchmarkFamilies.map((family) => (
        <section key={family.name} className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{family.name}</h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">
                {family.purpose}
              </p>
            </div>
            <CountBadge value={`${family.count} entries`} />
          </div>
          <div className="flex flex-wrap gap-2">
            {family.methods.map((method) => (
              <span
                key={`${family.name}-${method}`}
                className={method === 'GAHIB'
                  ? 'rounded bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white'
                  : 'rounded bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700'}
              >
                {method}
              </span>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
