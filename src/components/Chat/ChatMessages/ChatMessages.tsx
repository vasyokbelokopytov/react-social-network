import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUserAuthId } from '../../../redux/selectors/auth-selectors';
import {
  selectIsConnecting,
  selectIsConnectingError,
  selectIsConnectingFailed,
  selectMessages,
} from '../../../redux/selectors/chat-selectors';

import { Button, List, Result, message } from 'antd';

import styles from './ChatMessages.module.css';

import { ChatMessage } from './ChatMessage/ChatMessage';
import { chatAPI } from '../../../api/chat-api';

type PropsType = {};

export const ChatMessages: React.FC<PropsType> = () => {
  const authId = useSelector(selectUserAuthId);
  const messages = useSelector(selectMessages);
  const isConnectingFailed = useSelector(selectIsConnectingFailed);
  const IsConnectingError = useSelector(selectIsConnectingError);
  const isConnecting = useSelector(selectIsConnecting);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isAutoscroll, setIsAutoscroll] = useState(true);

  useEffect(() => {
    if (isAutoscroll) {
      wrapperRef.current?.scrollTo({
        top: wrapperRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [wrapperRef, messages, isAutoscroll]);

  useEffect(() => {
    if (isConnectingFailed) message.error('Unable to connect');
  }, [isConnectingFailed]);

  useEffect(() => {
    if (isConnecting) {
      message.loading({
        content: 'Connecting...',
        duration: 0,
        key: 'connecting',
      });
    } else {
      message.destroy('connecting');
    }
  }, [isConnecting]);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.currentTarget;

    if (
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      50
    ) {
      setIsAutoscroll(true);
    } else {
      setIsAutoscroll(false);
    }
  };

  const reconnect = () => {
    chatAPI.createConnection();
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef} onScroll={scrollHandler}>
      {IsConnectingError ? (
        <Result
          status="warning"
          title="There are some problems with your connection."
          extra={
            <Button type="primary" onClick={reconnect} loading={isConnecting}>
              {isConnecting ? 'Loading' : 'Reconnect'}
            </Button>
          }
        />
      ) : (
        <List
          rowKey="id"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <ChatMessage key={message.id} message={message} authId={authId} />
          )}
        />
      )}
    </div>
  );
};
