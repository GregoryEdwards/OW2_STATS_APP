import type { Ability } from '@/types/hero';
import { DataConfidenceBadge } from './DataConfidenceBadge';

const KIND_LABELS: Record<Ability['kind'], string> = {
  weapon: 'Weapon',
  'secondary-fire': 'Alt fire',
  ability: 'Ability',
  passive: 'Passive',
  ultimate: 'Ultimate',
};

const num = (v: number | undefined, suffix = ''): string =>
  v === undefined ? '—' : `${v}${suffix}`;

/** Renders a hero's full kit as a table. Reused on the detail and compare pages. */
export function AbilityTable({ abilities }: { abilities: Ability[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-ow-border text-left text-xs uppercase tracking-wide text-slate-400">
            <th className="py-2 pr-3 font-medium">Ability</th>
            <th className="py-2 pr-3 font-medium">Type</th>
            <th className="py-2 pr-3 text-right font-medium">CD</th>
            <th className="py-2 pr-3 text-right font-medium" title="Damage per hit / cast">
              Dmg
            </th>
            <th className="py-2 pr-3 text-right font-medium" title="Damage per second">
              DPS
            </th>
            <th className="py-2 pr-3 text-right font-medium" title="Healing per hit / cast">
              Heal
            </th>
            <th className="py-2 pr-3 text-right font-medium" title="Healing per second">
              HPS
            </th>
            <th className="py-2 text-right font-medium">Dur</th>
          </tr>
        </thead>
        <tbody>
          {abilities.map((a) => (
            <tr key={a.name} className="border-b border-ow-border/50 align-top">
              <td className="py-2 pr-3">
                <div className="flex items-center font-medium text-slate-100">
                  {a.name}
                  <DataConfidenceBadge confidence={a.dataConfidence} />
                </div>
                <p className="mt-0.5 max-w-md text-xs text-slate-400">{a.description}</p>
              </td>
              <td className="py-2 pr-3 text-slate-300">{KIND_LABELS[a.kind]}</td>
              <td className="py-2 pr-3 text-right tabular-nums text-slate-300">
                {num(a.cooldown, 's')}
              </td>
              <td className="py-2 pr-3 text-right tabular-nums text-slate-300">{num(a.damage)}</td>
              <td className="py-2 pr-3 text-right tabular-nums text-slate-300">
                {num(a.dps, '/s')}
              </td>
              <td className="py-2 pr-3 text-right tabular-nums text-slate-300">{num(a.healing)}</td>
              <td className="py-2 pr-3 text-right tabular-nums text-slate-300">
                {num(a.hps, '/s')}
              </td>
              <td className="py-2 text-right tabular-nums text-slate-300">{num(a.duration, 's')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
