import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector } from './redux';

export const useOwnerRedirect = () => {
  const { userId } = useParams<{ userId: string }>();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const history = useHistory();

  if (!isAuth && !userId) {
    history.push('/sign-in');
  }
};
