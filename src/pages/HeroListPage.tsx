import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroes } from '@/data/heroes';
import { useCompare } from '@/hooks/useCompare';
import { HeroGrid } from '@/components/HeroGrid';
import {
  SearchFilterBar,
  type DifficultyFilter,
  type HealingFilter,
} from '@/components/SearchFilterBar';

/** Landing page: searchable, filterable grid of all support heroes. */
export function HeroListPage() {
  const { selectedIds, toggle, canAddMore } = useCompare();
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('All');
  const [healing, setHealing] = useState<HealingFilter>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return heroes.filter((h) => {
      if (q && !h.name.toLowerCase().includes(q)) return false;
      if (difficulty !== 'All' && h.difficulty !== difficulty) return false;
      if (healing !== 'All' && h.healing.primaryType !== healing) return false;
      return true;
    });
  }, [query, difficulty, healing]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Heroes</h1>
          <p className="text-sm text-slate-400">
            {heroes.length} heroes · select up to 4 to{' '}
            <Link to="/compare" className="text-ow-orange hover:underline">
              compare
            </Link>
            .
          </p>
        </div>
      </div>

      <SearchFilterBar
        query={query}
        onQuery={setQuery}
        difficulty={difficulty}
        onDifficulty={setDifficulty}
        healing={healing}
        onHealing={setHealing}
      />

      <HeroGrid
        heroes={filtered}
        selectedIds={selectedIds}
        canAdd={canAddMore}
        onToggleCompare={toggle}
      />
    </div>
  );
}
