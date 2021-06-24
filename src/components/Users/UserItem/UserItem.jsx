import React from 'react';

import styles from './UserItem.module.css';

const UserItem = (props) => {
  return (
    <article className={styles.item}>
      <img className={styles.img} src={props.photoURL} alt="user"></img>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.city}>{props.city}</div>
      <div className={styles.country}>{props.country}</div>
      <div className={styles.status}>{props.status}</div>
      {props.followed ? (
        <button
          className={styles.button}
          onClick={() => props.unfollow(props.id)}
        >
          Unfollow
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={() => props.follow(props.id)}
        >
          Follow
        </button>
      )}
    </article>
  );
};

export default UserItem;
