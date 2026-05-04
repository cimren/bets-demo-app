import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponState, CouponSelection } from '../types/coupon';

const initialState: CouponState = {
  selections: [],
  totalStake: 1,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    toggleSelection: (state, _action: PayloadAction<CouponSelection>) => {
      const selectedMatchIndex = state.selections.findIndex(
        (s) => s.matchId === _action.payload.matchId,
      );
      if (selectedMatchIndex !== -1) {
        if (
          state.selections[selectedMatchIndex].oddId === _action.payload.oddId
        ) {
          // same odd already selected - remove it
          state.selections.splice(selectedMatchIndex, 1);
        } else {
          // different odd from the same match selected - replace it
          state.selections[selectedMatchIndex] = _action.payload;
        }
      } else {
        // no selection from the same match - add it
        state.selections.push(_action.payload);
      }
    },

    removeSelection: (state, _action: PayloadAction<string>) => {
      state.selections = state.selections.filter(
        (s) => s.oddId !== _action.payload,
      );
    },

    clearCoupon: (_state) => {
      _state.selections = [];
      _state.totalStake = 1;
    },
  },
});

export const { toggleSelection, removeSelection, clearCoupon } =
  couponSlice.actions;
export default couponSlice.reducer;
