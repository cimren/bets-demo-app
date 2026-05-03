import { configureStore } from '@reduxjs/toolkit';
import couponReducer from '../features/coupon/couponSlice';
import bulletinReducer from '../features/bulletin/bulletinSlice';

export const store = configureStore({
  reducer: {
    coupon: couponReducer,
    bulletin: bulletinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
