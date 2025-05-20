import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { userSlice } from './slices/userSlice';
import { ingredientsSlice } from './slices/ingredientSlice';
import { feedsSlice } from './slices/feedSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { orderSlice } from './slices/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  feedsSlice,
  burgerConstructorSlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
