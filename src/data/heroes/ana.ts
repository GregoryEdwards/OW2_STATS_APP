import type { SupportHero } from '@/types/hero';

export const ana: SupportHero = {
  id: 'ana',
  name: 'Ana',
  role: 'support',
  difficulty: 'Hard',
  releaseYear: 2016,
  portrait: '/portraits/ana.svg',

  survivability: { health: 250, armor: 0, shield: 0, total: 250 },

  weapon: {
    name: 'Biotic Rifle',
    type: 'hitscan',
    damage: 70,
    fireRate: 1.25,
    dps: 87.5,
    hps: 87.5,
    magazine: 15,
    reload: 1.5,
  },

  healing: {
    primaryType: 'projectile',
    peakHps: 87.5,
    notes: 'Rifle heals allies (70/shot) and damages enemies. Biotic Grenade adds burst healing + heal amplification.',
  },

  abilities: [
    {
      name: 'Biotic Rifle',
      kind: 'weapon',
      description: 'Long-range rifle that heals allies and damages enemies. Hold to scope.',
      damage: 70,
      dps: 87.5,
      healing: 70,
      hps: 87.5,
      healingType: 'projectile',
      dataConfidence: 'confirmed',
    },
    {
      name: 'Sleep Dart',
      kind: 'ability',
      description: 'Fires a dart that puts an enemy to sleep on hit. Damage wakes them.',
      cooldown: 14,
      damage: 5,
      duration: 3.5,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Biotic Grenade',
      kind: 'ability',
      description:
        'Area burst that heals allies and boosts their healing received, while damaging enemies and blocking their healing.',
      cooldown: 10,
      healing: 100,
      damage: 60,
      healingType: 'burst',
      dataConfidence: 'confirmed',
    },
    {
      name: 'Nano Boost',
      kind: 'ultimate',
      description: 'Boosts an ally: increased damage dealt and reduced damage taken.',
      ultCost: 1530,
      duration: 8,
      healing: 250,
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Nano Boost',
    cost: 1530,
    duration: 8,
    effect: '+50% damage dealt and -50% damage taken to the target ally, plus an instant heal.',
  },

  strategies: [
    {
      title: 'Sleep → Nade → shot → melee',
      detail:
        'A landed Sleep Dart sets up the full burst combo (grenade, shot, melee) which can delete a 200 HP target before they wake.',
      category: 'damage',
    },
    {
      title: 'Anti-heal the enemy, not just heal allies',
      detail:
        'Throw Biotic Grenade onto grouped enemies to apply anti-heal — denying enemy sustain usually creates more value than topping up your team.',
      category: 'utility',
    },
    {
      title: 'Nano a diving carry',
      detail:
        'Save Nano Boost for an ally who can convert it — the classic Nano-Blade on Genji is one of the hardest combos to counter. Keep Sleep Dart to interrupt enemy ultimates.',
      category: 'damage',
    },
  ],
};
