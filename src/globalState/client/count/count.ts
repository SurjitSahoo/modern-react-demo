import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICountState {
  count: number;
}

const initialState: ICountState = { count: 0 };

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    incrementBy(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    decrementBy(state, action: PayloadAction<number>) {
      state.count -= action.payload;
    },
  },
});

export default countSlice.reducer;
export const countActions = countSlice.actions;
