import React from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../../../types/types';

import userImg from '../../../assets/img/user.png';

import styles from './UserItem.module.css';

type PropsType = {
  user: UserType;
  followedUsers: Array<number>;
  followUser: (id: number) => void;
  unfollowUser: (id: number) => void;
  isAuth: boolean;
};

const UserItem: React.FC<PropsType> = (props) => {
  const follow = () => {
    props.followUser(props.user.id);
  };

  const unfollow = () => {
    props.unfollowUser(props.user.id);
  };

  return (
    <article className={styles.item}>
      <img
        className={styles.img}
        src={props.user.photos.small ? props.user.photos.small : userImg}
        alt="user"
      />
      <div className={styles.name}>
        <Link className={styles.link} to={`/profile/${props.user.id}`}>
          {props.user.name}
        </Link>
      </div>

      <div className={styles.status}>{props.user.status}</div>
      {props.isAuth &&
        (props.user.followed ? (
          <button
            className={styles.button}
            onClick={unfollow}
            disabled={props.followedUsers.includes(props.user.id)}
          >
            Unfollow
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={follow}
            disabled={props.followedUsers.includes(props.user.id)}
          >
            Follow
          </button>
        ))}
    </article>
  );
};

export default UserItem;
