import React from 'react';
import styles from './Form.module.css';

const Form = (props) => {
  const textareaRef = React.createRef();
  const addPost = (e) => {
    e.preventDefault();
    const newPostText = textareaRef.current.value;
    props.addPost(newPostText);
  };

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>My posts</h1>
      <textarea
        className={styles.textarea}
        name="text"
        placeholder="You can share your thoughts here..."
        ref={textareaRef}
      ></textarea>
      <button className={styles.submit} type="submit" onClick={addPost}>
        Share
      </button>
    </form>
  );
};

export default Form;
