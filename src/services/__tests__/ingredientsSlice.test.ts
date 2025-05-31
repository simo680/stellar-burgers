import {
  initialState,
  ingredientsSlice,
  getIngredients,
  TIngrediendSlice
} from '../slices/ingredientSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  it('тест установки ingredientsRequest = true при getIngredients.pending', () => {
    const result = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('', undefined)
    );

    expect(result).toEqual({
      ...initialState,
      ingredientsRequest: true,
      IngredientsError: null
    });
  });

  it('тест сохранения ингредиентов и отключение ingredientsRequest при getIngredients.fulfilled', () => {
    const prevState: TIngrediendSlice = {
      ...initialState,
      ingredientsRequest: true
    };

    const result = ingredientsSlice.reducer(
      prevState,
      getIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(result).toEqual({
      ...initialState,
      ingredients: mockIngredients,
      ingredientsRequest: false,
      IngredientsError: null
    });
  });

  it('тест сохранения сообщения об ошибке и отключение ingredientsRequest при getIngredients.rejected', () => {
    const prevState: TIngrediendSlice = {
      ...initialState,
      ingredientsRequest: true
    };

    const error = new Error('Ошибка загрузки ингредиентов');

    const result = ingredientsSlice.reducer(
      prevState,
      getIngredients.rejected(error, '', undefined)
    );

    expect(result.ingredientsRequest).toBe(false);
    expect(result.IngredientsError).toBe('Ошибка загрузки ингредиентов');
  });
});
