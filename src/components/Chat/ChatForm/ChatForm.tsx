import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import styles from './ChatForm.module.css';

import { sendMessage, sendPendingMessage } from '../../../redux/chat-reducer';

import {
  selectConnectingError,
  selectPendingMessages,
} from '../../../redux/selectors/chat-selectors';

const { TextArea } = Input;

type PropsType = {};

export const ChatForm: React.FC<PropsType> = () => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const connectingError = useSelector(selectConnectingError);
  const pendingMessages = useSelector(selectPendingMessages);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!connectingError && pendingMessages.length) {
      dispatch(sendPendingMessage(pendingMessages[0]));
    }
  }, [dispatch, connectingError, pendingMessages]);

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const send = (message: string) => {
    if (!connectingError) {
      if (message.trim() !== '') dispatch(sendMessage(message));
      setValue('');
    }
  };

  const clickHandler = () => {
    send(value);
    textareaRef.current?.focus();
  };

  const enterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
      send(value);
    }
  };

  return (
    <form className={styles.form}>
      <TextArea
        ref={textareaRef}
        disabled={!!connectingError}
        className={styles.textarea}
        placeholder="Type your message . . ."
        autoSize={{ minRows: 1, maxRows: 6 }}
        value={value}
        onChange={inputChangeHandler}
        onPressEnter={enterHandler}
      />
      <Button
        disabled={!!connectingError}
        className={styles.send}
        shape="circle"
        icon={<SendOutlined />}
        onClick={clickHandler}
      />
    </form>
  );
};
