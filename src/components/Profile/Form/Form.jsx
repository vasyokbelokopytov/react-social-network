import React from 'react';
import c from './Form.module.css';

const Form = () => {
  return (
    <form className={c.form}>
      <h1 className={c.title}>My posts</h1>
      <textarea
        className={c.textarea}
        name="text"
        placeholder="You can share your thoughts here..."
      ></textarea>
      <button className={c.submit} type="submit">
        Share
      </button>
    </form>
  );
};

export default Form;
