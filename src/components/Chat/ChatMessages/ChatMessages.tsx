import React, { useEffect, useRef, useState } from 'react';

import { Button, List, Result, message } from 'antd';

import styles from './ChatMessages.module.css';

import { ChatMessage } from './ChatMessage/ChatMessage';
import { reconnect } from '../../../redux/chatSlice';
import { useErrorMessage } from '../../../hooks/useErrorMessage';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

type PropsType = {};

export const ChatMessages: React.FC<PropsType> = () => {
  const authId = useAppSelector((state) => state.auth.id);
  const messages = useAppSelector((state) => state.chat.messages);
  const connectingError = useAppSelector((state) => state.chat.connectingError);
  const isConnecting = useAppSelector((state) => state.chat.isConnecting);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAutoscroll) {
      wrapperRef.current?.scrollTo({
        top: wrapperRef.current.scrollHeight,
      });
    }
  }, [wrapperRef, messages, isAutoscroll]);

  useErrorMessage(connectingError);

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

  const clickHandler = () => {
    dispatch(reconnect());
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef} onScroll={scrollHandler}>
      {connectingError ? (
        <Result
          status="warning"
          title="There are some problems with connection."
          extra={
            <Button
              type="primary"
              onClick={clickHandler}
              loading={isConnecting}
            >
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
