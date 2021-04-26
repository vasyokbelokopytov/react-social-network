import React from 'react';
import c from './Message.module.css';

const Message = (props) => {
  return (
    <article className={`${c.message} ${c[props.sender]}`}>
      <div className={c.text}>{props.text}</div>
      <div className={c.date}>{props.date}</div>
    </article>
  );
};

export default Message;
