import React from 'react';
import styles from './Item.module.css';

const Item = (props) => {
  return (
    <article className={styles.item}>
      <img
        className={styles.img}
        src="https://via.placeholder.com/90"
        alt="user"
      ></img>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.date}>{props.date}</div>
      <div className={styles.text}>{props.text}</div>
    </article>
  );
};

export default Item;
