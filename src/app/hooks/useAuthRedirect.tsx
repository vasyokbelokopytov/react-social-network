import { useHistory } from 'react-router-dom';

import { useAppSelector } from './redux';

export const useAuthRedirect = () => {
  const history = useHistory();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    history.push('/sign-in');
  }
};
