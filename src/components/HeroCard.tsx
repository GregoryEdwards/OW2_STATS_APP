import { Link } from 'react-router-dom';
import type { SupportHero } from '@/types/hero';
import { HeroPortrait } from './HeroPortrait';

interface HeroCardProps {
  hero: SupportHero;
  selected: boolean;
  /** Whether more heroes may still be added to the comparison. */
  canAdd: boolean;
  onToggleCompare: (id: string) => void;
}

const DIFFICULTY_STYLE: Record<SupportHero['difficulty'], string> = {
  Easy: 'text-emerald-400',
  Medium: 'text-amber-400',
  Hard: 'text-rose-400',
};

/** Grid card for a single hero: portrait, name, difficulty, and a compare toggle. */
export function HeroCard({ hero, selected, canAdd, onToggleCompare }: HeroCardProps) {
  const disabled = !selected && !canAdd;
  return (
    <div
      className={`panel overflow-hidden transition-colors ${
        selected ? 'ring-2 ring-ow-orange' : 'hover:border-slate-500'
      }`}
    >
      <Link to={`/hero/${hero.id}`} className="block">
        <HeroPortrait
          id={hero.id}
          name={hero.name}
          src={hero.portrait}
          className="h-40 w-full text-4xl"
        />
        <div className="px-4 pt-3">
          <h2 className="text-lg font-semibold text-white">{hero.name}</h2>
          <p className="text-xs text-slate-400">
            Support ·{' '}
            <span className={DIFFICULTY_STYLE[hero.difficulty]}>{hero.difficulty}</span>
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4 pt-3">
        <button
          type="button"
          aria-pressed={selected}
          disabled={disabled}
          onClick={() => onToggleCompare(hero.id)}
          className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            selected
              ? 'bg-ow-orange text-ow-dark hover:bg-amber-400'
              : 'bg-ow-border text-slate-200 hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40'
          }`}
        >
          {selected ? 'Selected ✓' : disabled ? 'Compare full' : 'Compare'}
        </button>
      </div>
    </div>
  );
}
