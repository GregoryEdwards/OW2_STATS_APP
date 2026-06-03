import { METRIC_LABELS } from '@/utils/stats';
import { RADAR_METRICS, type MetricKey } from '@/utils/normalize';

interface StatSelectorProps {
  value: MetricKey;
  onChange: (metric: MetricKey) => void;
}

/** Segmented control choosing which raw metric the bar chart displays. */
export function StatSelector({ value, onChange }: StatSelectorProps) {
  return (
    <div role="tablist" aria-label="Select stat" className="flex flex-wrap gap-1.5">
      {RADAR_METRICS.map((metric) => {
        const active = metric === value;
        return (
          <button
            key={metric}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(metric)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-ow-orange text-ow-dark'
                : 'bg-ow-border text-slate-300 hover:bg-slate-600'
            }`}
          >
            {METRIC_LABELS[metric]}
          </button>
        );
      })}
    </div>
  );
}
