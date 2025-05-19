// import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectConstructor = (state: RootState) => state.burgerConstructor;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
