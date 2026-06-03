import { useContext } from 'react';
import { CompareContext, CompareContextValue } from '@/context/compare-context';

/** Access the comparison selection state. Must be used within a CompareProvider. */
export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return ctx;
}
