import { RootState } from '../../app/store';
import { CouponSelection } from './types';

export const selectCouponSelections = (state: RootState): CouponSelection[] =>
  state.coupon.selections;

export const selectTotalOdd = (state: RootState): number => {
  return state.coupon.selections.reduce((acc, s) => acc * s.oddValue, 1);
};

export const selectPossibleWin = (state: RootState): number => {
  return selectTotalOdd(state) * state.coupon.totalStake;
};

export const selectSelectedOddIds = (state: RootState): Set<string> =>
  new Set(state.coupon.selections.map((s) => s.oddId));
