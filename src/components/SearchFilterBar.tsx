import type { Difficulty, HealingType } from '@/types/hero';

export type DifficultyFilter = Difficulty | 'All';
export type HealingFilter = HealingType | 'All';

interface SearchFilterBarProps {
  query: string;
  onQuery: (value: string) => void;
  difficulty: DifficultyFilter;
  onDifficulty: (value: DifficultyFilter) => void;
  healing: HealingFilter;
  onHealing: (value: HealingFilter) => void;
}

const DIFFICULTIES: DifficultyFilter[] = ['All', 'Easy', 'Medium', 'Hard'];
const HEALING_TYPES: HealingFilter[] = ['All', 'beam', 'burst', 'aura', 'projectile', 'over-time'];

const selectClass =
  'rounded-lg border border-ow-border bg-ow-panel px-3 py-2 text-sm text-slate-200 focus:border-ow-orange focus:outline-none';

/** Controlled search box + difficulty/healing-type filters for the hero list. */
export function SearchFilterBar({
  query,
  onQuery,
  difficulty,
  onDifficulty,
  healing,
  onHealing,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search heroes…"
        aria-label="Search heroes"
        className={`${selectClass} flex-1`}
      />
      <label className="flex items-center gap-2 text-xs text-slate-400">
        Difficulty
        <select
          value={difficulty}
          onChange={(e) => onDifficulty(e.target.value as DifficultyFilter)}
          aria-label="Filter by difficulty"
          className={selectClass}
        >
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2 text-xs text-slate-400">
        Healing
        <select
          value={healing}
          onChange={(e) => onHealing(e.target.value as HealingFilter)}
          aria-label="Filter by healing type"
          className={selectClass}
        >
          {HEALING_TYPES.map((h) => (
            <option key={h} value={h}>
              {h === 'All' ? 'All' : h}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
