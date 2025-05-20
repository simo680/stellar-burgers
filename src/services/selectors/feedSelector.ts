import { RootState } from '../store';

export const selectOrdersData = (state: RootState) => state.feeds.orders;

export const selectTotalOrders = (state: RootState) => state.feeds.total;

export const selectTodayOrders = (state: RootState) => state.feeds.totalToday;

export const selectFeedRequest = (state: RootState) => state.feeds.feedRequest;
