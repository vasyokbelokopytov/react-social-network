import React from 'react';
import { Field, Form } from 'react-final-form';
import { maxLength, trim } from '../../../utilities/validators/validators';
import Input from '../../common/Input/Input';
import Title from '../../common/Title/Title';
import styles from './PostForm.module.css';

type PropsType = {
  addPost: (postText: string) => void;
};

type FormDataType = {
  post: string;
};

const PostForm: React.FC<PropsType> = (props) => {
  const submitHandler = (formData: FormDataType) => {
    props.addPost(formData.post);
  };

  const maxLength20 = maxLength(20);
  return (
    <Form onSubmit={submitHandler}>
      {({ handleSubmit, submitting }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Title>My posts</Title>
            <Field<string>
              component={Input}
              element="textarea"
              className={styles.textarea}
              validate={trim(maxLength20)}
              format={(value) => (value === undefined ? '' : value)}
              name="post"
              placeholder="You can share your thoughts here..."
            />

            <button className={styles.submit} disabled={submitting}>
              Share
            </button>
          </form>
        );
      }}
    </Form>
  );
};

export default PostForm;
