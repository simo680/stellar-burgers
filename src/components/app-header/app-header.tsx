import { FC } from 'react';
import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';
import { selectUser } from '../../services/selectors/userSelector';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
