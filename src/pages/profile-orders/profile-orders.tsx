import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectOrderRequest,
  selectOrdersHistory,
  selectOrdersHistoryRequest
} from '../../services/selectors/orderSelector';
import { fetchOrdersHistory } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectOrdersHistory);
  const isLoading = useSelector(selectOrdersHistoryRequest);

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
