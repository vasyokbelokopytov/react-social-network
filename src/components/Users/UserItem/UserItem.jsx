import React from 'react';
import { Link } from 'react-router-dom';

import styles from './UserItem.module.css';

const UserItem = (props) => {
  const follow = () => {
    props.followUser(props.id);
  };

  const unfollow = () => {
    props.unfollowUser(props.id);
  };

  return (
    <article className={styles.item}>
      <img className={styles.img} src={props.photoURL} alt="user" />
      <div className={styles.name}>
        <Link className={styles.link} to={`/profile/${props.id}`}>
          {props.name}
        </Link>
      </div>
      <div className={styles.city}>{props.city}</div>
      <div className={styles.country}>{props.country}</div>
      <div className={styles.status}>{props.status}</div>
      {props.followed ? (
        <button
          className={styles.button}
          onClick={unfollow}
          disabled={props.isFollowing.includes(props.id)}
        >
          Unfollow
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={follow}
          disabled={props.isFollowing.includes(props.id)}
        >
          Follow
        </button>
      )}
    </article>
  );
};

export default UserItem;
