import React from 'react';
import { Field, Form } from 'react-final-form';
import {
  composeValidators,
  maxLength,
  required,
  trim,
} from '../../../utilities/validators/validators';
import Textarea from '../../common/Textarea/Textarea';
import styles from './ProfileForm.module.css';

const ProfileForm = (props) => {
  const maxLength20 = maxLength(20);
  return (
    <Form onSubmit={props.onSubmit}>
      {({ handleSubmit }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>My posts</h1>
            <Field
              className={styles.textarea}
              component={Textarea}
              validate={composeValidators(required, trim(maxLength20))}
              format={(value) => ((value, 'post') === undefined ? '' : value)}
              name="post"
              placeholder="You can share your thoughts here..."
            />
            <button className={styles.submit}>Share</button>
          </form>
        );
      }}
    </Form>
  );
};

export default ProfileForm;
