import { ReactNode, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { heroById } from '@/data/heroes';
import { CompareContext, CompareContextValue, MAX_COMPARE } from './compare-context';

const parseIds = (raw: string | null): string[] => {
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((id) => id in heroById)
    .slice(0, MAX_COMPARE);
};

/**
 * Holds the comparison selection in the URL's `ids` query param so comparisons
 * are shareable and survive reloads. All mutations go through setSearchParams.
 */
export function CompareProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIds = useMemo(() => parseIds(searchParams.get('ids')), [searchParams]);

  // Mutations derive the next selection from the latest URL params (not a render
  // closure) so rapid successive updates accumulate correctly.
  const mutate = useCallback(
    (update: (ids: string[]) => string[]) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const ids = update(parseIds(prev.get('ids')));
          if (ids.length) next.set('ids', ids.join(','));
          else next.delete('ids');
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const value = useMemo<CompareContextValue>(
    () => ({
      selectedIds,
      selectedHeroes: selectedIds.map((id) => heroById[id]).filter(Boolean),
      isSelected: (id: string) => selectedIds.includes(id),
      canAddMore: selectedIds.length < MAX_COMPARE,
      toggle: (id: string) => {
        if (!(id in heroById)) return;
        mutate((ids) => {
          if (ids.includes(id)) return ids.filter((x) => x !== id);
          return ids.length < MAX_COMPARE ? [...ids, id] : ids;
        });
      },
      remove: (id: string) => mutate((ids) => ids.filter((x) => x !== id)),
      clear: () => mutate(() => []),
    }),
    [selectedIds, mutate],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}
