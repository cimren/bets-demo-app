import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OddCell from '../components/OddCell';
import { OddItem } from '../types/bulletin';

const mockOdd: OddItem = {
  id: 'match-1-1',
  matchId: 'match-1',
  label: '1',
  value: 1.85,
  betType: '1X2',
};

const renderOddCell = (
  props: Partial<React.ComponentProps<typeof OddCell>> = {},
) =>
  render(
    <OddCell odd={mockOdd} isSelected={false} onClick={() => {}} {...props} />,
  );

describe('OddCell', () => {
  it('renders the odd label', () => {
    renderOddCell();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders the odd value formatted to 2 decimal places', () => {
    renderOddCell();
    expect(screen.getByText('1.85')).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const handleClick = vi.fn();
    renderOddCell({ onClick: handleClick });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('sets aria-pressed=false when not selected', () => {
    renderOddCell({ isSelected: false });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('sets aria-pressed=true when selected', () => {
    renderOddCell({ isSelected: true });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
  it('applies the selected CSS class when isSelected is true', () => {
    renderOddCell({ isSelected: true });
    expect(screen.getByRole('button')).toHaveClass('selected');
  });
  it('does not apply the selected CSS class when isSelected is false', () => {
    renderOddCell({ isSelected: false });
    expect(screen.getByRole('button')).not.toHaveClass('selected');
  });
});
