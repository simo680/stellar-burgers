import { TIngredient } from '@utils-types';
import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from '../slices/burgerConstructorSlice';

describe('burgerConstructorSlice reducer', () => {
  const mockBun: TIngredient = {
    _id: '1',
    name: 'Ингредиент 1',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockIngredient: TIngredient = {
    _id: '2',
    name: 'Ингредиент 2',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  it('тест на добавление булки', () => {
    const state = burgerConstructorSlice.reducer(
      undefined,
      addIngredient(mockBun)
    );
    expect(state.bun).toMatchObject(mockBun);
  });

  it('тест на добавление ингредиента в массив', () => {
    const state = burgerConstructorSlice.reducer(
      undefined,
      addIngredient(mockIngredient)
    );
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toMatchObject(mockIngredient);
    expect(state.ingredients[0].id).toBeDefined();
  });

  it('тест на удаление ингредиента', () => {
    const added = burgerConstructorSlice.reducer(
      undefined,
      addIngredient(mockIngredient)
    );
    const idToRemove = added.ingredients[0].id;
    const removed = burgerConstructorSlice.reducer(
      added,
      removeIngredient(idToRemove)
    );
    expect(removed.ingredients.length).toBe(0);
  });

  it('тест на перемещение ингредиента', () => {
    const first = { ...mockIngredient, _id: '1' };
    const second = { ...mockIngredient, _id: '2' };

    const withFirst = burgerConstructorSlice.reducer(
      undefined,
      addIngredient(first)
    );
    const withBoth = burgerConstructorSlice.reducer(
      withFirst,
      addIngredient(second)
    );

    const reordered = burgerConstructorSlice.reducer(
      withBoth,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(reordered.ingredients[0]._id).toBe('2');
    expect(reordered.ingredients[1]._id).toBe('1');
  });

  it('тест на сброс конструктора', () => {
    const withBun = burgerConstructorSlice.reducer(
      undefined,
      addIngredient(mockBun)
    );
    const withIngredient = burgerConstructorSlice.reducer(
      withBun,
      addIngredient(mockIngredient)
    );
    const reset = burgerConstructorSlice.reducer(
      withIngredient,
      resetConstructor()
    );
    expect(reset.bun).toBeNull();
    expect(reset.ingredients.length).toBe(0);
  });
});
