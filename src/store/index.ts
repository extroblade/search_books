import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filtersSlice from './slices/booksSlice.ts';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { booksApi } from './api/booksApi.ts';

const rootReducer = combineReducers({
  filtersReducer: filtersSlice.reducer,
  [booksApi.reducerPath]: booksApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware),
});
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export * from './slices/booksSlice.ts';
export * from './api/booksApi.ts';
