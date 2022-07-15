import { configureStore } from '@reduxjs/toolkit';
import { usersDataApi } from './usersDataApi';

export const store = configureStore({
  reducer: {
    [usersDataApi.reducerPath]: usersDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersDataApi.middleware),
});
