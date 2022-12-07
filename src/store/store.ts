import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';
import tagReducer from './tagSlice';

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    tags: tagReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
