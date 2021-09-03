import React from 'react';
import { Field, Form } from 'react-final-form';
import { maxLength, trim } from '../../../utilities/validators/validators';
import Input from '../../common/Input/Input';
import Title from '../../common/Title/Title';
import styles from './PostForm.module.css';

const PostForm = (props) => {
  const maxLength20 = maxLength(20);
  return (
    <Form onSubmit={props.onSubmit}>
      {({ handleSubmit }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Title>My posts</Title>
            <Field
              className={styles.textarea}
              validate={trim(maxLength20)}
              format={(value) => ((value, 'post') === undefined ? '' : value)}
              name="post"
              placeholder="You can share your thoughts here..."
            >
              {({ input, meta }) => (
                <Input
                  className={styles.textarea}
                  element="textarea"
                  input={input}
                  meta={meta}
                />
              )}
            </Field>
            <button className={styles.submit}>Share</button>
          </form>
        );
      }}
    </Form>
  );
};

export default PostForm;
