import type { SupportHero } from '@/types/hero';
import { AbilityTable } from '../AbilityTable';

/** Renders each selected hero's ability table in responsive side-by-side columns. */
export function SideBySideAbilities({ heroes }: { heroes: SupportHero[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {heroes.map((hero) => (
        <div key={hero.id} className="panel p-4">
          <h3 className="mb-3 text-base font-semibold text-white">{hero.name}</h3>
          <AbilityTable abilities={hero.abilities} />
        </div>
      ))}
    </div>
  );
}
