import {
  fetchFeeds,
  feedsSlice,
  TFeedState,
  initialState
} from '../slices/feedSlice';

describe('feedsSlice reducer', () => {
  const mockFeeds = {
    success: true,
    orders: [
      {
        _id: '683ac89ac2f30c001cb28d46',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный space астероидный традиционный-галактический био-марсианский бургер',
        createdAt: '2025-05-31T09:15:06.481Z',
        updatedAt: '2025-05-31T09:15:07.226Z',
        number: 79592
      },
      {
        _id: '683ac5e8c2f30c001cb28d40',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-05-31T09:03:36.153Z',
        updatedAt: '2025-05-31T09:03:36.838Z',
        number: 79591
      }
    ],
    total: 80000,
    totalToday: 27
  };
  it('тест установки feedRequest = true при fetchFeeds.pending', () => {
    const result = feedsSlice.reducer(
      initialState,
      fetchFeeds.pending('', undefined)
    );

    expect(result).toEqual({
      ...initialState,
      feedRequest: true,
      error: null
    });
  });

  it('тест записывания полученных заказов и отключает feedRequest при fetchFeeds.fulfilled', () => {
    const prevState: TFeedState = {
      ...initialState,
      feedRequest: true
    };

    const result = feedsSlice.reducer(
      prevState,
      fetchFeeds.fulfilled(mockFeeds, '', undefined)
    );

    expect(result).toEqual({
      ...initialState,
      orders: mockFeeds.orders,
      total: mockFeeds.total,
      totalToday: mockFeeds.totalToday,
      feedRequest: false
    });
  });

  it('тест сохранения сообщения об ошибке и отключает feedRequest при fetchFeeds.rejected', () => {
    const prevState: TFeedState = {
      ...initialState,
      feedRequest: true
    };

    const error = new Error('Не удалось загрузить');

    const result = feedsSlice.reducer(
      prevState,
      fetchFeeds.rejected(error, '', undefined)
    );

    expect(result.feedRequest).toBe(false);
    expect(result.error).toBe('Не удалось загрузить');
  });
});
