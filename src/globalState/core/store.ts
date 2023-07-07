import { configureStore } from '@reduxjs/toolkit';

import countReducer from '../client/count/count';

import postApi from '../server/post';

export const store = configureStore({
  reducer: {
    count: countReducer,
    [postApi.reducerPath]: postApi.reducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;
