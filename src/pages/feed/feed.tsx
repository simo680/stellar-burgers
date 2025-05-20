import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import { fetchFeeds } from '../../services/slices/feedSlice';
import {
  selectOrdersData,
  selectFeedRequest
} from '../../services/selectors/feedSelector';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrdersData);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedRequest);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
