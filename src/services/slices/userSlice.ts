import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TRegisterData,
  registerUserApi,
  TLoginData,
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi
} from '@api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TUser | null;
  loginUserRequest: boolean;
  registerUserRequest: boolean;
  updateUserRequest: boolean;
  registerUserError: string | undefined;
  loginUserError: string | undefined;
  updateUserError: string | undefined;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  loginUserRequest: false,
  registerUserRequest: false,
  updateUserRequest: false,
  loginUserError: undefined,
  updateUserError: undefined,
  registerUserError: undefined
};

export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('user/loginUser', async (userData, { rejectWithValue }) => {
  const data = await loginUserApi(userData);

  if (!data?.success) {
    return rejectWithValue('Ошибка авторизации');
  }

  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);

  return data.user;
});

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/registerUser', async (userData, { rejectWithValue }) => {
  const data = await registerUserApi(userData);

  if (!data.success) {
    return rejectWithValue('Ошибка регистрации');
  }

  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);

  return data.user;
});

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/updateUser', async (userData, { rejectWithValue }) => {
  const data = await updateUserApi(userData);

  if (!data?.success) {
    return rejectWithValue('Ошибка обновлении данных');
  }

  return data.user;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      dispatch(authChecked());
      return;
    }

    getUserApi()
      .then((response) => {
        if (response.success) {
          dispatch(setUser(response.user));
        }
      })
      .catch(() => {
        console.log('Ошибка выполнения авторизации');
      })
      .finally(() => {
        dispatch(authChecked());
      });
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    userLogout: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Ошибка входа';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserError = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserRequest = false;
        state.registerUserError = action.error?.message || 'Ошибка регистрации';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerUserRequest = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.updateUserRequest = true;
        state.updateUserError = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserRequest = false;
        state.updateUserError = action.error.message || 'Ошибка обновления';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserRequest = false;
        state.userData = action.payload;
      });
  }
});

export const { setUser, userLogout, authChecked } = userSlice.actions;
