import rootReducer from './rootReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [...getDefaultMiddleware()]
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
