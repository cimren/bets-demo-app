import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBulletin } from '../utils/bulletinApi';
import { Match } from '../types/bulletin';
import { RootState } from './store';

export const loadBulletin = createAsyncThunk('bulletin/load', fetchBulletin);

interface BulletinState {
  items: Match[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BulletinState = {
  items: [],
  status: 'idle',
  error: null,
};

const bulletinSlice = createSlice({
  name: 'bulletin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBulletin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBulletin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadBulletin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Bir hata oluştu';
      });
  },
});

export default bulletinSlice.reducer;

export const selectBulletinItems = (state: RootState) => state.bulletin.items;
export const selectBulletinStatus = (state: RootState) => state.bulletin.status;
export const selectBulletinError = (state: RootState) => state.bulletin.error;
