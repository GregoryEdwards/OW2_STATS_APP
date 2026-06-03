import type { SupportHero } from '@/types/hero';

export const juno: SupportHero = {
  id: 'juno',
  name: 'Juno',
  role: 'support',
  difficulty: 'Medium',
  releaseYear: 2024,
  portrait: '/portraits/juno.svg',

  survivability: { health: 225, armor: 0, shield: 0, total: 225 },

  weapon: {
    name: 'Mediblaster',
    type: 'projectile',
    damage: 13,
    fireRate: 5,
    dps: 65,
    hps: 45,
    magazine: 80,
    reload: 1.2,
  },

  healing: {
    primaryType: 'beam',
    peakHps: 45,
    notes: 'Mediblaster auto-locks healing onto allies in the reticle (~45/s). Pulsar Torpedoes add lock-on burst healing.',
  },

  abilities: [
    {
      name: 'Mediblaster',
      kind: 'weapon',
      description: 'Rapid-fire blaster that damages enemies and heals allies it is aimed at.',
      damage: 13,
      dps: 65,
      healing: 9,
      hps: 45,
      healingType: 'beam',
      dataConfidence: 'approximate',
    },
    {
      name: 'Pulsar Torpedoes',
      kind: 'ability',
      description: 'Lock onto multiple allies or enemies, then fire torpedoes that heal or damage them.',
      cooldown: 8,
      healing: 130,
      damage: 50,
      healingType: 'burst',
      dataConfidence: 'approximate',
    },
    {
      name: 'Hyper Ring',
      kind: 'ability',
      description: 'Deploys a ring that grants a movement-speed boost to allies who pass through it.',
      cooldown: 13,
      duration: 5,
      dataConfidence: 'approximate',
    },
    {
      name: 'Glide Boost',
      kind: 'ability',
      description: 'Boosts horizontally and unlocks gliding for a short time.',
      cooldown: 6,
      dataConfidence: 'approximate',
    },
    {
      name: 'Martian Overdrive',
      kind: 'passive',
      description: 'Hover by holding jump while airborne.',
      dataConfidence: 'confirmed',
    },
    {
      name: 'Orbital Ray',
      kind: 'ultimate',
      description: 'Calls down a large forward-moving ray that heals allies and amplifies their damage.',
      ultCost: 1700,
      duration: 9,
      hps: 60,
      healingType: 'aura',
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Orbital Ray',
    cost: 1700,
    duration: 9,
    effect: 'Deploys a moving zone that heals allies and increases their damage dealt.',
  },
};
