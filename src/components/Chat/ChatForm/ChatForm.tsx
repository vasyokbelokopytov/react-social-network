import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import styles from './ChatForm.module.css';

import { sendMessage } from '../../../redux/chat-reducer';

import {
  selectIsConnecting,
  selectIsConnectingError,
} from '../../../redux/selectors/chat-selectors';

const { TextArea } = Input;

type PropsType = {};

export const ChatForm: React.FC<PropsType> = () => {
  const [value, setValue] = useState('');
  const isConnecting = useSelector(selectIsConnecting);
  const IsConnectingError = useSelector(selectIsConnectingError);

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!IsConnectingError) {
      setValue(e.target.value);
    }
  };

  const dispatch = useDispatch();

  const send = (message: string) => {
    if (!IsConnectingError) {
      dispatch(sendMessage(message));
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
        className={styles.textarea}
        placeholder="Type your message..."
        autoSize={{ minRows: 1, maxRows: 6 }}
        value={value}
        onChange={inputChangeHandler}
        onKeyDown={keyPressHandler}
      />
      <Button
        disabled={isConnecting}
        className={styles.send}
        shape="circle"
        icon={<SendOutlined />}
        onClick={() => send(value)}
      />
    </form>
  );
};
