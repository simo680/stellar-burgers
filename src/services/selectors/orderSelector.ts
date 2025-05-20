import { RootState } from '../store';

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;

export const selectOrdersHistory = (state: RootState) =>
  state.order.ordersHistory;

export const selectOrdersHistoryRequest = (state: RootState) =>
  state.order.ordersHistoryRequest;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderLoading = (state: RootState) => state.order.isLoading;

export const selectOrderError = (state: RootState) => state.order.error;
