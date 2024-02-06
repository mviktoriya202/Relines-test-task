import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { productPageReducer } from './reducers/product-page';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const rootReducer = combineReducers({
  productPage: productPageReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: Partial<RootState> = {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});
export const dispatch = store.dispatch;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
