import React from 'react';
import c from './Item.module.css';

const Item = (props) => {
  return (
    <article className={c.item}>
      <img
        className={c.img}
        src="https://via.placeholder.com/90"
        alt="user"
      ></img>
      <div className={c.name}>{props.name}</div>
      <div className={c.date}>{props.date}</div>
      <div className={c.text}>{props.text}</div>
    </article>
  );
};

export default Item;
