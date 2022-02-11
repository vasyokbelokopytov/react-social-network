import React, { useEffect } from 'react';
import { Card } from 'antd';

import styles from './Chat.module.css';

import { ChatMessagesList } from './ChatMessages/ChatMessages';
import { ChatForm } from './ChatForm/ChatForm';
import { useDispatch } from 'react-redux';
import { subscribe, unsubscribe } from '../../features/chat/chatSlice';
import { useAuthRedirect } from '../../app/hooks/useAuthRedirect';

export const Chat: React.FC = () => {
  useAuthRedirect();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribe());
    return () => {
      dispatch(unsubscribe());
    };
  }, [dispatch]);

  return (
    <Card
      className={styles.wrapper}
      bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <ChatMessagesList />
      <ChatForm />
    </Card>
  );
};
