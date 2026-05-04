import { configureStore } from '@reduxjs/toolkit';
import couponReducer from './couponSlice';
import bulletinReducer from './bulletinSlice';

export const store = configureStore({
  reducer: {
    coupon: couponReducer,
    bulletin: bulletinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
