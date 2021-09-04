import React from 'react';
import cn from 'classnames';
import styles from './Message.module.css';

const Message = (props) => {
  return (
    <article className={cn(styles.message, styles[props.sender])}>
      <div className={styles.text}>{props.text}</div>
      <div className={styles.date}>{props.date}</div>
    </article>
  );
};

export default Message;
