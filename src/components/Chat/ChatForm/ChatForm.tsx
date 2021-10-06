import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import styles from './ChatForm.module.css';

import { sendMessage, sendPendingMessage } from '../../../redux/chat-reducer';

import {
  selectIsConnectingError,
  selectPendingMessages,
} from '../../../redux/selectors/chat-selectors';

const { TextArea } = Input;

type PropsType = {};

export const ChatForm: React.FC<PropsType> = () => {
  const [value, setValue] = useState('');

  const IsConnectingError = useSelector(selectIsConnectingError);
  const pendingMessages = useSelector(selectPendingMessages);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!IsConnectingError && pendingMessages.length) {
      dispatch(sendPendingMessage(pendingMessages[0]));
    }
  }, [dispatch, IsConnectingError, pendingMessages]);

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const send = (message: string) => {
    if (!IsConnectingError) {
      if (message.trim() !== '') dispatch(sendMessage(message));
      setValue('');
    }
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(value);
    }
  };

  return (
    <form className={styles.form}>
      <TextArea
        disabled={IsConnectingError}
        className={styles.textarea}
        placeholder="Type your message..."
        autoSize={{ minRows: 1, maxRows: 6 }}
        value={value}
        onChange={inputChangeHandler}
        onKeyDown={keyPressHandler}
      />
      <Button
        disabled={IsConnectingError}
        className={styles.send}
        shape="circle"
        icon={<SendOutlined />}
        onClick={() => send(value)}
      />
    </form>
  );
};
