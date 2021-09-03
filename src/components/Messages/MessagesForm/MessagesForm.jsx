import React from 'react';
import { Field, Form } from 'react-final-form';

import styles from './MessagesForm.module.css';

import sendMessageImg from '../../../assets/img/Navbar/messages.svg';

const MessagesForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      {({ handleSubmit }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field
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
