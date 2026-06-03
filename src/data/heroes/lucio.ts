import type { SupportHero } from '@/types/hero';

export const lucio: SupportHero = {
  id: 'lucio',
  name: 'Lúcio',
  role: 'support',
  difficulty: 'Medium',
  releaseYear: 2016,
  portrait: '/portraits/lucio.svg',

  survivability: { health: 250, armor: 0, shield: 0, total: 250 },

  weapon: {
    name: 'Sonic Amplifier',
    type: 'projectile',
    damage: 20,
    fireRate: 4,
    dps: 80,
    magazine: 24,
    reload: 1.4,
  },

  healing: {
    primaryType: 'aura',
    peakHps: 18.4,
    notes: 'Heal song passively heals all nearby allies. Amp It Up greatly boosts the aura. Speed song instead boosts movement.',
  },

  abilities: [
    {
      name: 'Sonic Amplifier',
      kind: 'weapon',
      description: 'Fires sound projectiles. Alternate fire knocks back enemies in front of Lúcio.',
      damage: 20,
      dps: 80,
      dataConfidence: 'confirmed',
    },
    {
      name: 'Crossfade',
      kind: 'ability',
      description: 'Toggle between a healing aura and a speed-boost aura for nearby allies.',
      hps: 18.4,
      healingType: 'aura',
      dataConfidence: 'approximate',
    },
    {
      name: 'Amp It Up',
      kind: 'ability',
      description: 'Temporarily increases the strength of the active song (healing or speed).',
      cooldown: 12,
      hps: 46,
      duration: 3,
      healingType: 'aura',
      dataConfidence: 'approximate',
    },
    {
      name: 'Soundwave',
      kind: 'ability',
      description: 'Blasts nearby enemies away with a burst of sound.',
      cooldown: 4,
      damage: 25,
      dataConfidence: 'approximate',
    },
    {
      name: 'Wall Ride',
      kind: 'passive',
      description: 'Ride along walls, gaining speed and the ability to reach high ground.',
      dataConfidence: 'confirmed',
    },
    {
      name: 'Sound Barrier',
      kind: 'ultimate',
      description: 'Grants Lúcio and nearby allies a large amount of temporary overhealth that decays over time.',
      ultCost: 1750,
      duration: 6,
      dataConfidence: 'approximate',
    },
  ],

  ultimate: {
    name: 'Sound Barrier',
    cost: 1750,
    duration: 6,
    effect: 'Grants nearby allies a burst of temporary shields that rapidly decay.',
  },
};
