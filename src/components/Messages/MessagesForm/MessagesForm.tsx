import React from 'react';
import { Field, Form } from 'react-final-form';

import styles from './MessagesForm.module.css';

import sendMessageImg from '../../../assets/img/Navbar/messages.svg';

type PropsType = {
  sendMessage: (message: string) => void;
};

type FormDataType = {
  message: string;
};

const MessagesForm: React.FC<PropsType> = (props) => {
  const submitHandler = (formData: FormDataType) => {
    props.sendMessage(formData.message);
  };

  return (
    <Form onSubmit={submitHandler}>
      {({ handleSubmit }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field<string>
              className={styles.textarea}
              component="textarea"
              name="message"
              placeholder="You can write your message here..."
            />
            <button className={styles.submit}>
              <img className={styles.icon} src={sendMessageImg} alt="submit" />
            </button>
          </form>
        );
      }}
    </Form>
  );
};

export default MessagesForm;
