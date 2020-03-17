import rootReducer from './rootReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [...getDefaultMiddleware()]
});

export type RootState = ReturnType<typeof rootReducer>;
export type StateActions = {
  isLoading: boolean;
  httpError: string | undefined;
};
export default store;
