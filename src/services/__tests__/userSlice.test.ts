import {
  userSlice,
  initialState,
  loginUser,
  registerUser,
  updateUser,
  setUser,
  userLogout,
  authChecked
} from '../slices/userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const mockUserLogin = {
    email: 'test@example.com',
    password: 'testExample'
  };

  const mockUserRegister = {
    email: 'test@example.com',
    name: 'Erik',
    password: 'testExample'
  };

  const mockUserUpdate: TUser = {
    email: 'test@example.com',
    name: 'simozoid'
  };

  // Login
  it('тест loginUser.pending на установку loginUserRequest в true и сброса ошибки', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.pending('', mockUserLogin)
    );
    expect(state.loginUserRequest).toBe(true);
    expect(state.loginUserError).toBeUndefined();
  });

  it('тест loginUser.fulfilled на сохранение данных пользователя и авторизации его', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.fulfilled(mockUserUpdate, '', mockUserLogin)
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.userData).toEqual(mockUserUpdate);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('тест loginUser.rejected должен сохранить ошибку авторизации', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка входа' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.loginUserError).toBe('Ошибка входа');
  });

  // Register
  it('тест registerUser.pending должен установить registerUserRequest в true и сбросить ошибку', () => {
    const state = userSlice.reducer(
      initialState,
      registerUser.pending('', mockUserRegister)
    );
    expect(state.registerUserRequest).toBe(true);
    expect(state.registerUserError).toBeUndefined();
  });

  it('тест registerUser.fulfilled на сохранение данных пользователя и авторизации его', () => {
    const state = userSlice.reducer(
      initialState,
      registerUser.fulfilled(mockUserUpdate, '', mockUserRegister)
    );
    expect(state.registerUserRequest).toBe(false);
    expect(state.userData).toEqual(mockUserUpdate);
    expect(state.isAuthenticated).toBe(true);
  });

  it('тест registerUser.rejected должен сохранить ошибку регистрации', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.registerUserRequest).toBe(false);
    expect(state.registerUserError).toBe('Ошибка регистрации');
  });

  // Update
  it('тест updateUser.pending устанавливает updateUserRequest в true и сбрасывает ошибку', () => {
    const state = userSlice.reducer(
      initialState,
      updateUser.pending('', mockUserUpdate)
    );
    expect(state.updateUserRequest).toBe(true);
    expect(state.updateUserError).toBeUndefined();
  });

  it('тест updateUser.fulfilled обновляет данные пользователя', () => {
    const state = userSlice.reducer(
      initialState,
      updateUser.fulfilled(mockUserUpdate, '', mockUserUpdate)
    );
    expect(state.updateUserRequest).toBe(false);
    expect(state.userData).toEqual(mockUserUpdate);
  });

  it('тест updateUser.rejected сохраняет ошибку обновления', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка обновления' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.updateUserRequest).toBe(false);
    expect(state.updateUserError).toBe('Ошибка обновления');
  });

  // Reduccers
  it('тест setUser сохранение данных пользователя и установки isAuthenticated в true', () => {
    const state = userSlice.reducer(initialState, setUser(mockUserUpdate));
    expect(state.userData).toEqual(mockUserUpdate);
    expect(state.isAuthenticated).toBe(true);
  });

  it('тест userLogout должен удалить данные пользователя и сбросить isAuthenticated', () => {
    const loggedInState = {
      ...initialState,
      userData: mockUserUpdate,
      isAuthenticated: true
    };
    const state = userSlice.reducer(loggedInState, userLogout());
    expect(state.userData).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('тест authChecked должен установить isAuthChecked в true', () => {
    const state = userSlice.reducer(initialState, authChecked());
    expect(state.isAuthChecked).toBe(true);
  });
});
