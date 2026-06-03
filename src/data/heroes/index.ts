import type { SupportHero } from '@/types/hero';
import { ana } from './ana';
import { baptiste } from './baptiste';
import { brigitte } from './brigitte';
import { illari } from './illari';
import { juno } from './juno';
import { kiriko } from './kiriko';
import { lifeweaver } from './lifeweaver';
import { lucio } from './lucio';
import { mercy } from './mercy';
import { moira } from './moira';
import { wuyang } from './wuyang';
import { zenyatta } from './zenyatta';

/** The full support roster, sorted alphabetically by display name. */
export const heroes: SupportHero[] = [
  ana,
  baptiste,
  brigitte,
  illari,
  juno,
  kiriko,
  lifeweaver,
  lucio,
  mercy,
  moira,
  wuyang,
  zenyatta,
];

/** Lookup map from hero id to hero. */
export const heroById: Record<string, SupportHero> = Object.fromEntries(
  heroes.map((h) => [h.id, h]),
);
