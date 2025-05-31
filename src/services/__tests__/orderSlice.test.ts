import { TOrder } from '@utils-types';
import {
  orderSlice,
  initialState,
  createOrder,
  fetchOrderByNumber,
  fetchOrdersHistory,
  clearCurrentOrder,
  clearOrderModalData
} from '../slices/orderSlice';

describe('orderSlice reducer', () => {
  const mockOrder: TOrder = {
    _id: '22812',
    status: 'completed',
    name: 'Space Burger',
    createdAt: '2025-05-31T09:15:06.481Z',
    updatedAt: '2025-05-31T09:15:07.226Z',
    number: 365,
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e'
    ]
  };

  // createOrder
  it('тест установки orderRequest = true при createOrder.pending', () => {
    const result = orderSlice.reducer(
      initialState,
      createOrder.pending('', [])
    );
    expect(result.orderRequest).toBe(true);
    expect(result.error).toBeNull();
  });

  it('тест сохранение заказа и отключение orderRequest при createOrder.fulfilled', () => {
    const result = orderSlice.reducer(
      { ...initialState, orderRequest: true },
      createOrder.fulfilled(mockOrder, '', [])
    );
    expect(result.orderRequest).toBe(false);
    expect(result.orderModalData).toEqual(mockOrder);
  });

  it('тест сохранения ошибки и отключения orderRequest при createOrder.rejected', () => {
    const error = 'Ошибка при создании заказа';
    const result = orderSlice.reducer(
      { ...initialState, orderRequest: true },
      createOrder.rejected(null, '', [], error)
    );
    expect(result.orderRequest).toBe(false);
    expect(result.error).toBe(error);
  });

  // fetchOrderByNumber
  it('тест включает isLoading при fetchOrderByNumber.pending', () => {
    const result = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.pending('', 123)
    );
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('тест сохранения заказа и отключение isLoading при fetchOrderByNumber.fulfilled', () => {
    const result = orderSlice.reducer(
      { ...initialState, isLoading: true },
      fetchOrderByNumber.fulfilled(mockOrder, '', 123)
    );
    expect(result.isLoading).toBe(false);
    expect(result.orderModalData).toEqual(mockOrder);
  });

  it('тест сохранения ошибки и отключение isLoading при fetchOrderByNumber.rejected', () => {
    const error = 'Заказ не найден';
    const result = orderSlice.reducer(
      { ...initialState, isLoading: true },
      fetchOrderByNumber.rejected(null, '', 123, error)
    );
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(error);
  });

  // fetchOrdersHistory
  it('тест включение ordersHistoryRequest при fetchOrdersHistory.pending', () => {
    const result = orderSlice.reducer(
      initialState,
      fetchOrdersHistory.pending('', undefined)
    );
    expect(result.ordersHistoryRequest).toBe(true);
    expect(result.error).toBeNull();
  });

  it('тест сохранения истории заказов при fetchOrdersHistory.fulfilled', () => {
    const result = orderSlice.reducer(
      { ...initialState, ordersHistoryRequest: true },
      fetchOrdersHistory.fulfilled([mockOrder], '', undefined)
    );
    expect(result.ordersHistoryRequest).toBe(false);
    expect(result.ordersHistory).toEqual([mockOrder]);
  });

  it('тест сохранения ошибки и отключение ordersHistoryRequest при fetchOrdersHistory.rejected', () => {
    const error = 'Ошибка загрузки истории заказов';
    const result = orderSlice.reducer(
      { ...initialState, ordersHistoryRequest: true },
      fetchOrdersHistory.rejected(null, '', undefined, error)
    );
    expect(result.ordersHistoryRequest).toBe(false);
    expect(result.error).toBe(error);
  });

  // Reducers
  it('тест очистки currentOrder при clearCurrentOrder', () => {
    const result = orderSlice.reducer(
      { ...initialState, currentOrder: mockOrder },
      clearCurrentOrder()
    );
    expect(result.currentOrder).toBeNull();
  });

  it('тест очистки orderModalData при clearOrderModalData', () => {
    const result = orderSlice.reducer(
      { ...initialState, orderModalData: mockOrder },
      clearOrderModalData()
    );
    expect(result.orderModalData).toBeNull();
  });
});
