import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  currentOrder: TOrder | null;
  ordersHistory: TOrder[];
  orderModalData: TOrder | null;
  isLoading: boolean;
  orderRequest: boolean;
  ordersHistoryRequest: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  currentOrder: null,
  ordersHistory: [],
  orderModalData: null,
  isLoading: false,
  orderRequest: false,
  ordersHistoryRequest: false,
  error: null
};

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/createOrder', async (ingredients, { rejectWithValue }) => {
  const res = await orderBurgerApi(ingredients);

  if (!res?.success) {
    return rejectWithValue('Ошибка создании заказа');
  }

  return res.order;
});

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/fetchOrderByNumber', async (number, { rejectWithValue }) => {
  const res = await getOrderByNumberApi(number);

  if (!res?.success || !res.orders.length) {
    return rejectWithValue('Заказ не найден');
  }

  return res.orders[0];
});

export const fetchOrdersHistory = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('order/fetchOrdersHistory', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch {
    return rejectWithValue('Ошибка загрузки истории заказов');
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Создание заказа

      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload ?? 'Не удалось создать заказ';
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload;
        }
      )

      // Заказ по номеру
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Не удалось загрузить заказ';
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.error = null;
          state.orderModalData = action.payload;
        }
      )

      // История заказов

      .addCase(fetchOrdersHistory.pending, (state) => {
        state.ordersHistoryRequest = true;
        state.error = null;
      })
      .addCase(fetchOrdersHistory.rejected, (state, action) => {
        state.ordersHistoryRequest = false;
        state.error = action.payload ?? 'Не удалось загрузить историю';
      })
      .addCase(
        fetchOrdersHistory.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.ordersHistoryRequest = false;
          state.ordersHistory = action.payload;
        }
      );
  }
});

export const { clearCurrentOrder, clearOrderModalData } = orderSlice.actions;
