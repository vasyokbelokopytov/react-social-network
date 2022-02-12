import { message } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useErrorMessage = (error: string | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) message.error(error);
  }, [dispatch, error]);
};
