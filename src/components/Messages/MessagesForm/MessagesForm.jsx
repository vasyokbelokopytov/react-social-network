import React from 'react';
import { Field, Form } from 'react-final-form';

import styles from './MessagesForm.module.css';

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
              <img
                className={styles.icon}
                src="https://via.placeholder.com/27"
                alt="submit"
              />
            </button>
          </form>
        );
      }}
    </Form>
  );
};

export default MessagesForm;
