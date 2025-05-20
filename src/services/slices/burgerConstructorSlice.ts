import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorSlice = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorSlice = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...item } };
      },
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.ingredients = state.ingredients.filter((item) => item.id !== id);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;

      const movedItem = state.ingredients[fromIndex];

      const newIngredients = [...state.ingredients];

      newIngredients.splice(fromIndex, 1);
      newIngredients.splice(toIndex, 0, movedItem);

      state.ingredients = newIngredients;
    },

    resetConstructor: (state: TConstructorSlice) => {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;
