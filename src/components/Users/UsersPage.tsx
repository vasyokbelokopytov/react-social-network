import React, { useCallback, useEffect } from 'react';
import {
  useQueryParams,
  StringParam,
  BooleanParam,
  NumberParam,
} from 'use-query-params';

import styles from './UsersPage.module.css';
import UserItem from './UserItem/UserItem';
import Paginator from '../common/Paginator/Paginator';

import Loader from '../common/Loader/Loader';
import Title from '../common/Title/Title';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';

import {
  actions as usersActions,
  thunks as usersThunks,
  FilterType,
} from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/selectors/auth-selectors';
import {
  selectCurrentPage,
  selectFilter,
  selectFollowedUsers,
  selectIsFetching,
  selectPageSize,
  selectTotalUsersCount,
  selectUsers,
} from '../../redux/selectors/users-selectors';
import { ThunkDispatchType } from '../../types/types';

type PropsType = {};

export const UsersPage: React.FC<PropsType> = () => {
  const isAuth = useSelector(selectIsAuth);
  const users = useSelector(selectUsers);
  const pageSize = useSelector(selectPageSize);
  const totalUsersCount = useSelector(selectTotalUsersCount);
  const currentPage = useSelector(selectCurrentPage);
  const filter = useSelector(selectFilter);
  const isFetching = useSelector(selectIsFetching);
  const followedUsers = useSelector(selectFollowedUsers);

  const dispatch = useDispatch<ThunkDispatchType<typeof usersActions>>();

  const [query, setQuery] = useQueryParams({
    term: StringParam,
    friend: BooleanParam,
    page: NumberParam,
  });

  const loadUsers = useCallback(
    (page: number, pageSize: number, filter: FilterType) => {
      dispatch(usersThunks.loadUsers(page, pageSize, filter));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(
      usersActions.setFilter({
        term: query.term ?? filter.term,
        friend: query.friend ?? filter.friend,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setQuery({
      term: filter.term ? filter.term : undefined,
      friend: filter.friend,
      page: currentPage,
    });

    loadUsers(currentPage, pageSize, filter);
  }, [filter, currentPage, pageSize, setQuery, loadUsers]);

  const pageChangeHandler = (page: number) => {
    dispatch(usersActions.setCurrentPage(page));
  };

  const filterChangeHandler = (filter: FilterType) => {
    dispatch(usersActions.setFilter(filter));
    dispatch(usersActions.setCurrentPage(1));
  };

  const followUser = (id: number) => {
    dispatch(usersThunks.followUser(id));
  };

  const unfollowUser = (id: number) => {
    dispatch(usersThunks.unfollowUser(id));
  };

  return (
    <section className={styles.users}>
      <Title>Search users:</Title>
      <UsersSearchForm filterChangeHandler={filterChangeHandler} />

      {isFetching && <Loader className={styles.loader} />}
      <div className={styles.usersList}>
        {users.map((user) => {
          return (
            <UserItem
              key={user.id}
              user={user}
              followedUsers={followedUsers}
              followUser={followUser}
              unfollowUser={unfollowUser}
              isAuth={isAuth}
            />
          );
        })}
      </div>

      <div className={styles.paginator}>
        <Paginator
          totalItemsCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          portionSize={5}
          pageChangeHandler={pageChangeHandler}
        />
      </div>
    </section>
  );
};
