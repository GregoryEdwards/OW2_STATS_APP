import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HeroCard } from './HeroCard';
import { mercy } from '@/data/heroes/mercy';

const renderCard = (props: Partial<Parameters<typeof HeroCard>[0]> = {}) => {
  const onToggleCompare = vi.fn();
  render(
    <MemoryRouter>
      <HeroCard
        hero={mercy}
        selected={false}
        canAdd
        onToggleCompare={onToggleCompare}
        {...props}
      />
    </MemoryRouter>,
  );
  return { onToggleCompare };
};

describe('HeroCard', () => {
  it('renders the hero name and difficulty', () => {
    renderCard();
    expect(screen.getByText('Mercy')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('calls onToggleCompare with the hero id when the button is clicked', async () => {
    const { onToggleCompare } = renderCard();
    await userEvent.click(screen.getByRole('button', { name: /compare/i }));
    expect(onToggleCompare).toHaveBeenCalledWith('mercy');
  });

  it('reflects the selected state via aria-pressed', () => {
    renderCard({ selected: true });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('disables the button when full and not selected', () => {
    renderCard({ canAdd: false, selected: false });
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
