import { configureStore } from '@reduxjs/toolkit';
import couponReducer from '../features/coupon/couponSlice';

export const store = configureStore({
  reducer: {
    coupon: couponReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
