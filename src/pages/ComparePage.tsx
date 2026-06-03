import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '@/hooks/useCompare';
import { MIN_COMPARE } from '@/context/compare-context';
import { HeroPicker } from '@/components/compare/HeroPicker';
import { StatSelector } from '@/components/compare/StatSelector';
import { SideBySideAbilities } from '@/components/compare/SideBySideAbilities';
import { RadarComparison } from '@/components/charts/RadarComparison';
import { StatBarChart } from '@/components/charts/StatBarChart';
import { EmptyState } from '@/components/EmptyState';
import type { MetricKey } from '@/utils/normalize';

/** Comparison view: radar overview, single-stat bar ranking, and ability tables. */
export function ComparePage() {
  const { selectedHeroes, clear } = useCompare();
  const [metric, setMetric] = useState<MetricKey>('hps');

  const enough = selectedHeroes.length >= MIN_COMPARE;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Compare</h1>
        {selectedHeroes.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-sm text-slate-400 hover:text-white"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="panel p-4">
        <p className="mb-3 text-sm font-medium text-slate-300">
          Select heroes ({selectedHeroes.length}/4)
        </p>
        <HeroPicker />
      </div>

      {!enough ? (
        <EmptyState
          title="Pick at least two heroes"
          message="Choose heroes above (or from the heroes page) to see a side-by-side comparison."
          action={
            <Link to="/" className="text-ow-orange hover:underline">
              Browse heroes
            </Link>
          }
        />
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="panel p-4">
              <h2 className="text-lg font-semibold text-white">Overview</h2>
              <p className="mb-2 text-xs text-slate-500">
                Each axis is normalized 0–100 against the full roster (higher = stronger; ult cost
                and cooldown are inverted).
              </p>
              <RadarComparison heroes={selectedHeroes} />
            </div>

            <div className="panel p-4">
              <h2 className="text-lg font-semibold text-white">Stat ranking</h2>
              <p className="mb-3 text-xs text-slate-500">Raw values, sorted best to worst.</p>
              <StatSelector value={metric} onChange={setMetric} />
              <div className="mt-4">
                <StatBarChart heroes={selectedHeroes} metric={metric} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">Abilities</h2>
            <SideBySideAbilities heroes={selectedHeroes} />
          </div>
        </>
      )}
    </div>
  );
}
