import React from 'react';
import styles from './Message.module.css';

const Message = (props) => {
  return (
    <article className={`${styles.message} ${styles[props.sender]}`}>
      <div className={styles.text}>{props.text}</div>
      <div className={styles.date}>{props.date}</div>
    </article>
  );
};

export default Message;
