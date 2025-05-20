import { RootState } from '../store';

export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export const selectUser = (state: RootState) => state.user.userData;

export const selectloginUserError = (state: RootState) =>
  state.user.loginUserError;

export const selectRegisterUserError = (state: RootState) =>
  state.user.registerUserError;
