import type { SupportHero } from '@/types/hero';
import { HeroCard } from './HeroCard';
import { EmptyState } from './EmptyState';

interface HeroGridProps {
  heroes: SupportHero[];
  selectedIds: string[];
  canAdd: boolean;
  onToggleCompare: (id: string) => void;
}

/** Responsive grid of hero cards. */
export function HeroGrid({ heroes, selectedIds, canAdd, onToggleCompare }: HeroGridProps) {
  if (heroes.length === 0) {
    return <EmptyState title="No heroes match" message="Try clearing the search or filters." />;
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
          selected={selectedIds.includes(hero.id)}
          canAdd={canAdd}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  );
}
