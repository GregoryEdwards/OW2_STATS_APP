import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { SupportHero } from '@/types/hero';
import { buildMetricRanges, toRadarData } from '@/utils/normalize';
import { heroes as allHeroes } from '@/data/heroes';
import { seriesColor } from '@/utils/colors';

// Ranges computed once over the full roster so scores are stable regardless of
// who is selected.
const ranges = buildMetricRanges(allHeroes);

/**
 * Overlaid radar chart comparing selected heroes across all metrics, each axis
 * normalized 0–100 relative to the full roster (higher = stronger).
 */
export function RadarComparison({ heroes }: { heroes: SupportHero[] }) {
  const data = toRadarData(heroes, ranges);
  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#283039" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
        <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} angle={90} />
        {heroes.map((hero, i) => (
          <Radar
            key={hero.id}
            name={hero.name}
            dataKey={hero.id}
            stroke={seriesColor(i)}
            fill={seriesColor(i)}
            fillOpacity={0.25}
          />
        ))}
        <Tooltip
          contentStyle={{
            background: '#161b22',
            border: '1px solid #283039',
            borderRadius: 8,
            color: '#e2e8f0',
          }}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
