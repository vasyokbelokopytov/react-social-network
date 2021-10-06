import React, { useEffect } from 'react';
import { Card } from 'antd';

import withAuthRedirect from '../../hoc/withAuthRedirect';

import styles from './ChatPage.module.css';

import { ChatMessages } from './ChatMessages/ChatMessages';
import { ChatForm } from './ChatForm/ChatForm';
import { useDispatch } from 'react-redux';
import {
  actions as chatActions,
  subscribe,
  unsubscribe,
} from '../../redux/chat-reducer';

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribe());
    return () => {
      dispatch(unsubscribe());
      dispatch(chatActions.statusChanged('pending'));
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
