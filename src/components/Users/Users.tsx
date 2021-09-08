import React from 'react';

import styles from './Users.module.css';
import UserItem from './UserItem/UserItem';
import Paginator from '../common/Paginator/Paginator';

import userImg from '../../assets/img/user.png';
import Loader from '../common/Loader/Loader';
import Title from '../common/Title/Title';
import { UserType } from '../../types/types';

type PropsType = {
  isAuth: boolean;
  isFollowing: Array<number>;
  isFetching: boolean;
  users: Array<UserType>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  pageChangeHandler: (lastPortionPage: number) => void;
  followUser: (id: number) => void;
  unfollowUser: (id: number) => void;
};

const Users: React.FC<PropsType> = (props) => {
  return (
    <section className={styles.users}>
      <Title>Search users:</Title>

      {props.isFetching && <Loader className={styles.loader} />}
      <div className={styles.usersList}>
        {props.users.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              name={user.name}
              photoURL={user.photos.small ?? userImg}
              country="Ukraine"
              city="Kyiv"
              status={user.status}
              followed={user.followed}
              isFollowing={props.isFollowing}
              followUser={props.followUser}
              unfollowUser={props.unfollowUser}
              isAuth={props.isAuth}
            />
          );
        })}
      </div>

      <div className={styles.paginator}>
        <Paginator
          totalItemsCount={props.totalUsersCount}
          pageSize={props.pageSize}
          currentPage={props.currentPage}
          portionSize={5}
          pageChangeHandler={props.pageChangeHandler}
        />
      </div>
    </section>
  );
};

export default Users;