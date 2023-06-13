import { configureStore } from '@reduxjs/toolkit';

import countReducer from '../count';

import postApi from '../post';

export const store = configureStore({
  reducer: {
    count: countReducer,
    [postApi.reducerPath]: postApi.reducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;
