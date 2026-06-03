import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CompareProvider } from '@/context/CompareContext';
import { ComparePage } from './ComparePage';

// jsdom has no layout, so Recharts' ResponsiveContainer would render at 0x0.
// Give it a fixed size so child charts mount.
vi.mock('recharts', async () => {
  const actual = await vi.importActual<typeof import('recharts')>('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  };
});

const renderCompare = (ids: string) =>
  render(
    <MemoryRouter initialEntries={[`/compare?ids=${ids}`]}>
      <CompareProvider>
        <ComparePage />
      </CompareProvider>
    </MemoryRouter>,
  );

describe('ComparePage', () => {
  it('prompts to pick heroes when fewer than two are selected', () => {
    renderCompare('ana');
    expect(screen.getByText(/pick at least two heroes/i)).toBeInTheDocument();
  });

  it('renders both selected heroes and the comparison sections', () => {
    renderCompare('ana,mercy');

    // Names appear in the picker chips and ability table headings.
    expect(screen.getAllByText('Ana').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mercy').length).toBeGreaterThan(0);

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Stat ranking')).toBeInTheDocument();
  });

  it('changes the selected stat when a StatSelector tab is clicked', async () => {
    renderCompare('ana,mercy');

    const tablist = screen.getByRole('tablist', { name: /select stat/i });
    const dpsTab = within(tablist).getByRole('tab', { name: /damage \/ sec/i });

    await userEvent.click(dpsTab);
    expect(dpsTab).toHaveAttribute('aria-selected', 'true');
  });
});
