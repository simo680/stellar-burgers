import { rootReducer } from './store';

import { initialState as burgerConstructor } from './slices/burgerConstructorSlice';
import { initialState as feeds } from './slices/feedSlice';
import { initialState as ingredients } from './slices/ingredientSlice';
import { initialState as order } from './slices/orderSlice';
import { initialState as user } from './slices/userSlice';

describe('rootReducer ', () => {
  it('тест корректной инициализации и возвращения начального состояния', () => {
    const initialAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initialAction);

    expect(state).toEqual({
      user,
      ingredients,
      feeds,
      burgerConstructor,
      order
    });
  });
});
