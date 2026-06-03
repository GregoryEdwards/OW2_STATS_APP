import { describe, expect, it } from 'vitest';
import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CompareProvider } from '@/context/CompareContext';
import { MAX_COMPARE } from '@/context/compare-context';
import { useCompare } from './useCompare';

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>
    <CompareProvider>{children}</CompareProvider>
  </MemoryRouter>
);

describe('useCompare', () => {
  it('toggles a hero in and out of the selection', () => {
    const { result } = renderHook(() => useCompare(), { wrapper });

    act(() => result.current.toggle('ana'));
    expect(result.current.selectedIds).toEqual(['ana']);
    expect(result.current.isSelected('ana')).toBe(true);

    act(() => result.current.toggle('ana'));
    expect(result.current.selectedIds).toEqual([]);
  });

  it('enforces the maximum comparison cap', () => {
    const { result } = renderHook(() => useCompare(), { wrapper });

    // Each click is its own render in real usage, so toggle one id per act().
    ['ana', 'mercy', 'lucio', 'moira', 'kiriko'].forEach((id) => {
      act(() => result.current.toggle(id));
    });

    expect(result.current.selectedIds).toHaveLength(MAX_COMPARE);
    expect(result.current.canAddMore).toBe(false);
    expect(result.current.isSelected('kiriko')).toBe(false);
  });

  it('ignores unknown hero ids', () => {
    const { result } = renderHook(() => useCompare(), { wrapper });
    act(() => result.current.toggle('not-a-hero'));
    expect(result.current.selectedIds).toEqual([]);
  });

  it('clears the whole selection', () => {
    const { result } = renderHook(() => useCompare(), { wrapper });
    act(() => {
      result.current.toggle('ana');
      result.current.toggle('mercy');
    });
    act(() => result.current.clear());
    expect(result.current.selectedIds).toEqual([]);
  });
});
