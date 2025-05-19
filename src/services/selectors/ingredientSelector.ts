import { RootState } from '../store';

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const selectIngredientsRequest = (state: RootState) =>
  state.ingredients.ingredientsRequest;
