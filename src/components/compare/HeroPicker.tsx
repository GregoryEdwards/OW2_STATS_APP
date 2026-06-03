import { heroes } from '@/data/heroes';
import { useCompare } from '@/hooks/useCompare';

/**
 * Chip-based multi-select to add/remove heroes from the comparison. Selected
 * chips are highlighted; the cap is enforced via canAddMore.
 */
export function HeroPicker() {
  const { isSelected, toggle, canAddMore } = useCompare();
  return (
    <div className="flex flex-wrap gap-2">
      {heroes.map((hero) => {
        const selected = isSelected(hero.id);
        const disabled = !selected && !canAddMore;
        return (
          <button
            key={hero.id}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => toggle(hero.id)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              selected
                ? 'border-ow-orange bg-ow-orange/20 text-ow-orange'
                : 'border-ow-border text-slate-300 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-40'
            }`}
          >
            {hero.name}
          </button>
        );
      })}
    </div>
  );
}
