import React, { useEffect } from 'react';
import { Card } from 'antd';

import withAuthRedirect from '../../hoc/withAuthRedirect';

import styles from './ChatPage.module.css';

import { ChatMessages } from './ChatMessages/ChatMessages';
import { ChatForm } from './ChatForm/ChatForm';
import { useDispatch } from 'react-redux';
import { subscribe, unsubscribe } from '../../redux/chatSlice';

const Chat: React.FC = () => {
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
      <ChatMessages />
      <ChatForm />
    </Card>
  );
};

export const ChatPage = withAuthRedirect(Chat);
