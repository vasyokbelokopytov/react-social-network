import React from 'react';
import styles from './Form.module.css';

import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/profile-reducer';

const Form = (props) => {
  const addPost = (e) => {
    e.preventDefault();
    props.dispatch(addPostActionCreator());
  };

  const onTextareaChange = (e) => {
    const newPostText = e.target.value;
    props.dispatch(updateNewPostTextActionCreator(newPostText));
  };

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>My posts</h1>
      <textarea
        className={styles.textarea}
        name="text"
        placeholder="You can share your thoughts here..."
        value={props.newPostText}
        onChange={onTextareaChange}
      />
      <button className={styles.submit} type="submit" onClick={addPost}>
        Share
      </button>
    </form>
  );
};

export default Form;
