import { PREPUB } from '@/lib/prepub';

type Row = {
  dataset: string;
  cells?: string;
  notes?: string;
};

const datasets: Row[] = [
  { dataset: 'PBMC 3k (10x Genomics)', cells: '~2,700', notes: 'Standard QC benchmark' },
  { dataset: 'paul15 (Paul et al. 2015)', cells: '~2,700', notes: 'Myeloid progenitors' },
  { dataset: 'DentateGyrus (La Manno et al.)', cells: '~18,000', notes: 'Mouse dentate gyrus' },
  { dataset: 'Pancreas (Bastidas-Ponce et al.)', cells: '~36,000', notes: 'Endocrine development' },
  { dataset: 'Bone Marrow (Setty et al.)', cells: '~5,800', notes: 'CD34+ hematopoiesis' },
  { dataset: 'Gastrulation (Pijuan-Sala et al.)', cells: '~116,000', notes: 'Mouse atlas' },
  { dataset: 'ForebrainGlut', cells: '~2,000', notes: 'Glutamatergic neurons' },
];

export function BenchmarkTable() {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-2">Dataset</th>
            <th scope="col" className="px-4 py-2">Cells</th>
            <th scope="col" className="px-4 py-2">Notes</th>
            {!PREPUB && <th scope="col" className="px-4 py-2">Score</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {datasets.map((r) => (
            <tr key={r.dataset}>
              <td className="px-4 py-2 font-medium">{r.dataset}</td>
              <td className="px-4 py-2 text-slate-600">{r.cells}</td>
              <td className="px-4 py-2 text-slate-600">{r.notes}</td>
              {!PREPUB && <td className="px-4 py-2 text-slate-400">—</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {PREPUB && (
        <div className="border-t border-slate-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          Numerical scores withheld until publication. Datasets shown are those evaluated in the manuscript.
        </div>
      )}
    </div>
  );
}

export default BenchmarkTable;
