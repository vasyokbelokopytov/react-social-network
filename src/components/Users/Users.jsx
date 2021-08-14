import React from 'react';

import styles from './Users.module.css';
import UserItem from './UserItem/UserItem';
import Paginator from '../common/Paginator/Paginator';

import userImg from '../../assets/img/user.png';
import Loader from '../common/Loader/Loader';

const Users = (props) => {
  return (
    <section className={styles.users}>
      <h1 className={styles.title}>Search users:</h1>

      {props.isFetching && <Loader />}
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
            />
          );
        })}
      </div>

      <div className={styles.paginator}>
        <Paginator
          className={styles.paginator}
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
