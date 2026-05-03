import { describe, it, expect } from 'vitest';
import {
  selectCouponSelections,
  selectTotalOdd,
  selectSelectedOddIds,
} from '../selectors';
import { RootState } from '../../../app/store';
import { CouponState, CouponSelection } from '../types';

const buildState = (coupon: Partial<CouponState>): RootState =>
  ({ coupon: { selections: [], totalStake: 1, ...coupon } }) as RootState;

const makeSelection = (
  oddId: string,
  oddValue: number,
  stake = 0,
): CouponSelection => ({
  oddId,
  matchId: `match-${oddId}`,
  matchLabel: 'Team A — Team B',
  oddLabel: '1',
  oddValue,
  stake,
});

describe('selectCouponSelections', () => {
  it('returns an empty array when there are no selections', () => {
    expect(selectCouponSelections(buildState({}))).toEqual([]);
  });

  it('returns the selections array', () => {
    const selections = [makeSelection('odd-1', 1.5)];
    expect(selectCouponSelections(buildState({ selections }))).toEqual(
      selections,
    );
  });
});

describe('selectTotalOdd', () => {
  it('returns the product of all selection oddValues', () => {
    const selections = [
      makeSelection('odd-1', 1.5),
      makeSelection('odd-2', 2.0),
    ];
    expect(selectTotalOdd(buildState({ selections }))).toBe(3.0);
  });
  it('returns the correct value for a single selection', () => {
    const selections = [makeSelection('odd-1', 1.5)];
    expect(selectTotalOdd(buildState({ selections }))).toBe(1.5);
  });
  it('returns 0 when there are no selections', () => {
    expect(selectTotalOdd(buildState({}))).toBe(0);
  });
});

describe('selectSelectedOddIds', () => {
  it('returns an empty Set when there are no selections', () => {
    expect(selectSelectedOddIds(buildState({}))).toEqual(new Set());
  });

  it('returns a Set of all selected oddIds', () => {
    const selections = [
      makeSelection('odd-1', 1.5),
      makeSelection('odd-2', 2.0),
    ];
    expect(selectSelectedOddIds(buildState({ selections }))).toEqual(
      new Set(['odd-1', 'odd-2']),
    );
  });
});
