import type { SupportHero } from '@/types/hero';

export const mercy: SupportHero = {
  id: 'mercy',
  name: 'Mercy',
  role: 'support',
  difficulty: 'Easy',
  releaseYear: 2016,
  portrait: '/portraits/mercy.svg',

  survivability: { health: 225, armor: 0, shield: 0, total: 225 },

  weapon: {
    name: 'Caduceus Blaster',
    type: 'hitscan',
    damage: 20,
    fireRate: 4.5,
    dps: 90,
    hps: 55,
    magazine: 20,
    reload: 1.4,
  },

  healing: {
    primaryType: 'beam',
    peakHps: 55,
    notes: 'Caduceus Staff attaches a continuous healing (or damage-boost) beam to one ally. Switch targets freely.',
  },

  abilities: [
    {
      name: 'Caduceus Staff',
      kind: 'weapon',
      description: 'Beam that continuously heals one ally, or boosts an ally’s damage. Caduceus Blaster is the backup pistol.',
      hps: 55,
      healingType: 'beam',
      dataConfidence: 'approximate',
    },
    {
      name: 'Guardian Angel',
      kind: 'ability',
      description: 'Fly toward a targeted ally. Can be cancelled into a jump or backwards leap.',
      cooldown: 1.5,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Resurrect',
      kind: 'ability',
      description: 'Revive a dead ally after a short channel.',
      cooldown: 30,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Angelic Descent',
      kind: 'passive',
      description: 'Hold jump to slow your fall.',
      dataConfidence: 'confirmed',
    },
    {
      name: 'Valkyrie',
      kind: 'ultimate',
      description: 'Gain free flight and enhanced beams that chain to multiple nearby allies.',
      ultCost: 1500,
      duration: 15,
      hps: 55,
      healingType: 'beam',
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Valkyrie',
    cost: 1500,
    duration: 15,
    effect: 'Enables flight and extends staff beams to chain across all nearby allies.',
  },
};
