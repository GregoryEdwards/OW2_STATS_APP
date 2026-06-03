import type { SupportHero } from '@/types/hero';

export const brigitte: SupportHero = {
  id: 'brigitte',
  name: 'Brigitte',
  role: 'support',
  difficulty: 'Easy',
  releaseYear: 2018,
  portrait: '/portraits/brigitte.svg',

  survivability: { health: 200, armor: 50, shield: 0, total: 250 },

  weapon: {
    name: 'Rocket Flail',
    type: 'melee',
    damage: 35,
    fireRate: 1,
    dps: 35,
    reload: 0,
  },

  healing: {
    primaryType: 'aura',
    peakHps: 55,
    notes: 'Inspire passively heals nearby allies over time whenever Brigitte deals melee damage. Repair Pack adds burst healing.',
  },

  abilities: [
    {
      name: 'Rocket Flail',
      kind: 'weapon',
      description: 'Long-reach melee flail that strikes enemies in front of Brigitte.',
      damage: 35,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Repair Pack',
      kind: 'ability',
      description: 'Throws a pack that heals an ally, with charges that recharge over time.',
      cooldown: 6,
      healing: 90,
      healingType: 'burst',
      dataConfidence: 'approximate',
    },
    {
      name: 'Whip Shot',
      kind: 'ability',
      description: 'Throws the flail forward to damage and knock back an enemy.',
      cooldown: 4,
      damage: 60,
      dataConfidence: 'approximate',
    },
    {
      name: 'Barrier Shield',
      kind: 'ability',
      description: 'Deploys a frontal barrier that blocks incoming damage. Shield Bash follows.',
      cooldown: 5,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Inspire',
      kind: 'passive',
      description: 'Dealing melee damage heals Brigitte and nearby allies over time.',
      hps: 55,
      duration: 6,
      healingType: 'aura',
      dataConfidence: 'approximate',
    },
    {
      name: 'Rally',
      kind: 'ultimate',
      description: 'Grants Brigitte a speed boost and provides decaying armor to nearby allies.',
      ultCost: 1500,
      duration: 10,
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Rally',
    cost: 1500,
    duration: 10,
    effect: 'Move faster and grant nearby allies stacking armor that persists after the ability ends.',
  },
};
