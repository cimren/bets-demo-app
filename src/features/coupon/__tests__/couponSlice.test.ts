import { describe, it, expect } from 'vitest';
import couponReducer, {
  toggleSelection,
  removeSelection,
  clearCoupon,
} from '../couponSlice';
import { CouponState, CouponSelection } from '../types';

const initialState: CouponState = {
  selections: [],
  totalStake: 1,
};

const makeSelection = (
  overrides: Partial<CouponSelection> = {},
): CouponSelection => ({
  oddId: 'match-1-1',
  matchId: 'match-1',
  matchLabel: 'Team A — Team B',
  oddLabel: '1',
  oddValue: 1.85,
  stake: 0,
  ...overrides,
});

describe('couponSlice', () => {
  it('returns the initial state for an unknown action', () => {
    expect(couponReducer(undefined, { type: '__unknown__' })).toEqual(
      initialState,
    );
  });

  describe('toggleSelection', () => {
    it('adds a new selection when the oddId is not in state', () => {
      const selection = makeSelection();
      const state = couponReducer(initialState, toggleSelection(selection));
      expect(state.selections).toEqual([selection]);
    });
    it('removes a selection when the same oddId is toggled again', () => {
      const selection = makeSelection();
      const state = couponReducer(
        { ...initialState, selections: [selection] },
        toggleSelection(selection),
      );
      expect(state.selections).toEqual([]);
    });
    it('replaces an existing selection from the same match when a different odd is toggled', () => {
      const selection1 = makeSelection({ oddId: 'odd-1', oddValue: 1.5 });
      const selection2 = makeSelection({ oddId: 'odd-2', oddValue: 2.0 });
      const state = couponReducer(
        { ...initialState, selections: [selection1] },
        toggleSelection(selection2),
      );
      expect(state.selections).toEqual([selection2]);
    });
  });

  describe('removeSelection', () => {
    it('removes the selection matching the given oddId', () => {
      const selection = makeSelection();
      const state = couponReducer(
        { ...initialState, selections: [selection] },
        removeSelection(selection.oddId),
      );
      expect(state.selections).toEqual([]);
    });
    it('leaves other selections untouched', () => {
      const selection1 = makeSelection({ oddId: 'odd-1', oddValue: 1.5 });
      const selection2 = makeSelection({ oddId: 'odd-2', oddValue: 2.0 });
      const state = couponReducer(
        { ...initialState, selections: [selection1, selection2] },
        removeSelection(selection1.oddId),
      );
      expect(state.selections).toEqual([selection2]);
    });
  });

  describe('clearCoupon', () => {
    it('resets selections to [] and totalStake to 1', () => {
      const state = couponReducer(
        { ...initialState, selections: [makeSelection()] },
        clearCoupon(),
      );
      expect(state.selections).toEqual([]);
      expect(state.totalStake).toBe(1);
    });
  });
});
