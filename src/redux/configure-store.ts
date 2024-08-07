import {configureStore} from '@reduxjs/toolkit';
import feedSliceReducer from './feedSlice';

export const store = configureStore({
  reducer: {
    feedSlice: feedSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
