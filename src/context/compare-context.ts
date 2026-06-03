import { createContext } from 'react';
import type { SupportHero } from '@/types/hero';

export const MAX_COMPARE = 4;
export const MIN_COMPARE = 2;

export interface CompareContextValue {
  /** Ordered list of selected hero ids (canonical, mirrored to the URL). */
  selectedIds: string[];
  /** Resolved hero objects for the selected ids. */
  selectedHeroes: SupportHero[];
  /** Add the id if absent, remove it if present (respecting the max cap). */
  toggle: (id: string) => void;
  /** Remove a specific id from the selection. */
  remove: (id: string) => void;
  /** Clear the entire selection. */
  clear: () => void;
  /** Whether another hero can still be added. */
  canAddMore: boolean;
  isSelected: (id: string) => boolean;
}

export const CompareContext = createContext<CompareContextValue | null>(null);
