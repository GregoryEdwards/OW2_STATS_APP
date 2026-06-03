import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { SupportHero } from '@/types/hero';
import { heroMetrics, METRIC_LABELS, METRIC_UNITS } from '@/utils/stats';
import type { MetricKey } from '@/utils/normalize';
import { seriesColor } from '@/utils/colors';

interface StatBarChartProps {
  heroes: SupportHero[];
  metric: MetricKey;
}

/**
 * Bar chart ranking the selected heroes on one raw metric (real values, sorted
 * descending). Bar colors match each hero's radar series color.
 */
export function StatBarChart({ heroes, metric }: StatBarChartProps) {
  const unit = METRIC_UNITS[metric] ?? '';
  const colorById = new Map(heroes.map((h, i) => [h.id, seriesColor(i)]));

  const data = heroes
    .map((h) => ({ id: h.id, name: h.name, value: heroMetrics(h)[metric] }))
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={Math.max(180, data.length * 56)}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 40 }}>
        <CartesianGrid horizontal={false} stroke="#283039" />
        <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <YAxis
          type="category"
          dataKey="name"
          width={90}
          tick={{ fill: '#cbd5e1', fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: '#ffffff10' }}
          formatter={(value: number) => [`${value}${unit}`, METRIC_LABELS[metric]]}
          contentStyle={{
            background: '#161b22',
            border: '1px solid #283039',
            borderRadius: 8,
            color: '#e2e8f0',
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((d) => (
            <Cell key={d.id} fill={colorById.get(d.id)} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(v: number) => `${v}${unit}`}
            fill="#e2e8f0"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
