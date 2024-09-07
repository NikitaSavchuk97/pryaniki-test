import dataSlice from './slices/dataSlice';
import userSlice from '../../src/redux/slices/userSlice';

import { Action, combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  userSlice: userSlice,
  dataSlice: dataSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, Action>;
