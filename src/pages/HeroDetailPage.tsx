import { Link, useParams } from 'react-router-dom';
import { heroById } from '@/data/heroes';
import { useCompare } from '@/hooks/useCompare';
import { HeroPortrait } from '@/components/HeroPortrait';
import { StatBlock } from '@/components/StatBlock';
import { AbilityTable } from '@/components/AbilityTable';
import { StrategyList } from '@/components/StrategyList';
import { EmptyState } from '@/components/EmptyState';
import { avgCooldown, minCooldown } from '@/utils/stats';

/** Full stat breakdown for a single hero. */
export function HeroDetailPage() {
  const { id } = useParams();
  const hero = id ? heroById[id] : undefined;
  const { isSelected, toggle, canAddMore } = useCompare();

  if (!hero) {
    return (
      <EmptyState
        title="Hero not found"
        message="That hero id doesn’t exist."
        action={
          <Link to="/" className="text-ow-orange hover:underline">
            Back to heroes
          </Link>
        }
      />
    );
  }

  const selected = isSelected(hero.id);
  const disabled = !selected && !canAddMore;

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm text-slate-400 hover:text-white">
        ← All heroes
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <HeroPortrait
          id={hero.id}
          name={hero.name}
          src={hero.portrait}
          className="h-24 w-24 rounded-xl text-2xl"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">{hero.name}</h1>
          <p className="text-sm text-slate-400">
            Support · {hero.difficulty} · Released {hero.releaseYear}
          </p>
        </div>
        <button
          type="button"
          aria-pressed={selected}
          disabled={disabled}
          onClick={() => toggle(hero.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            selected
              ? 'bg-ow-orange text-ow-dark hover:bg-amber-400'
              : 'bg-ow-border text-slate-200 hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40'
          }`}
        >
          {selected ? 'Selected ✓' : disabled ? 'Compare full' : 'Add to compare'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatBlock
          title="Survivability"
          items={[
            { label: 'Health', value: hero.survivability.health },
            { label: 'Armor', value: hero.survivability.armor },
            { label: 'Shield', value: hero.survivability.shield },
            { label: 'Total HP', value: hero.survivability.total },
          ]}
        />
        <StatBlock
          title={`Weapon · ${hero.weapon.name}`}
          items={[
            { label: 'Damage', value: hero.weapon.damage },
            { label: 'Fire rate', value: `${hero.weapon.fireRate}/s` },
            { label: 'DPS', value: `${hero.weapon.dps}/s` },
            {
              label: 'Weapon HPS',
              value: hero.weapon.hps !== undefined ? `${hero.weapon.hps}/s` : '—',
            },
            { label: 'Peak HPS', value: `${hero.healing.peakHps}/s` },
          ]}
        />
        <StatBlock
          title="Cooldowns & Ultimate"
          items={[
            { label: 'Min cooldown', value: `${minCooldown(hero)}s` },
            { label: 'Avg cooldown', value: `${avgCooldown(hero)}s` },
            { label: hero.ultimate.name, value: `${hero.ultimate.cost}` },
            { label: 'Healing type', value: hero.healing.primaryType },
          ]}
        />
      </div>

      <div className="panel p-4">
        <h2 className="mb-1 text-lg font-semibold text-white">Abilities</h2>
        {hero.healing.notes && <p className="mb-3 text-sm text-slate-400">{hero.healing.notes}</p>}
        <AbilityTable abilities={hero.abilities} />
      </div>

      <div className="panel p-4">
        <h2 className="mb-1 text-lg font-semibold text-white">Combos &amp; Strategies</h2>
        <p className="mb-3 text-sm text-slate-400">
          Optimization tips and ult combos curated from community guides.
        </p>
        <StrategyList strategies={hero.strategies} />
      </div>

      <div className="panel p-4">
        <h2 className="text-lg font-semibold text-white">Ultimate · {hero.ultimate.name}</h2>
        <p className="mt-1 text-sm text-slate-300">{hero.ultimate.effect}</p>
        <p className="mt-2 text-xs text-slate-500">
          Cost {hero.ultimate.cost}
          {hero.ultimate.duration ? ` · Duration ${hero.ultimate.duration}s` : ''}
        </p>
      </div>
    </div>
  );
}
