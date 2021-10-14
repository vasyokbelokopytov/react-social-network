import { message } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Action, ActionCreator } from 'redux';

export const useErrorMessage = (
  error: Error | null,
  clear?: ActionCreator<Action>,
  instant: boolean = true
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) message.error(error.message);
    if (clear && instant) dispatch(clear(null));
  }, [dispatch, error, clear, instant]);

  useEffect(() => {
    if (clear && !instant)
      return () => {
        dispatch(clear(null));
      };
  }, [dispatch, clear, instant]);
};
