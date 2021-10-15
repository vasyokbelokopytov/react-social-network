import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  actions as usersActions,
  fetchUsers,
  followUser,
  unfollowUser,
} from '../../redux/users-reducer';

import { selectIsAuth } from '../../redux/selectors/auth-selectors';

import {
  selectCurrentPage,
  selectUsersInFollowingProcess,
  selectIsFetching,
  selectPageSize,
  selectTotalUsersCount,
  selectUsers,
  selectPageSizeOptions,
  selectFetchingError,
  selectFollowingError,
  selectFilter,
} from '../../redux/selectors/users-selectors';

import {
  useQueryParams,
  StringParam,
  BooleanParam,
  NumberParam,
} from 'use-query-params';

import { UserItem } from './UserItem/UserItem';
import { UsersSearchForm } from './UsersSearchForm/UsersSearchForm';

import { Card, List, Space, Pagination, Result, Button } from 'antd';

import { ThunkDispatchType, FilterType } from '../../types/types';
import { useErrorMessage } from '../../hooks/useErrorMessage';

type PropsType = {};

export const UsersPage: React.FC<PropsType> = () => {
  const isAuth = useSelector(selectIsAuth);
  const users = useSelector(selectUsers);
  const pageSize = useSelector(selectPageSize);
  const pageSizeOptinos = useSelector(selectPageSizeOptions);
  const filter = useSelector(selectFilter);
  const totalUsersCount = useSelector(selectTotalUsersCount);
  const currentPage = useSelector(selectCurrentPage);
  const isFetching = useSelector(selectIsFetching);
  const fetchingError = useSelector(selectFetchingError);
  const usersInFollowingProcess = useSelector(selectUsersInFollowingProcess);
  const followingError = useSelector(selectFollowingError);

  const dispatch = useDispatch<ThunkDispatchType>();

  const [query, setQuery] = useQueryParams({
    term: StringParam,
    friend: BooleanParam,
    page: NumberParam,
    count: NumberParam,
  });

  useEffect(() => {
    const friend = query.friend === undefined || !isAuth ? null : query.friend;
    const term = !query.term ? '' : query.term;
    const page = !query.page ? 1 : query.page;
    const count =
      !query.count || !pageSizeOptinos.includes(query.count)
        ? pageSize
        : query.count;

    dispatch(usersActions.filterChanged({ friend, term }));
    dispatch(usersActions.currentPageChanged(page));
    dispatch(usersActions.pageSizeChanged(count));

    dispatch(fetchUsers(page, count, { friend, term }));
  }, [dispatch, pageSize, pageSizeOptinos, query, isAuth]);

  useErrorMessage(fetchingError, usersActions.fetchingErrorChanged, false);
  useErrorMessage(followingError, usersActions.followingErrorChanged);

  const pageChangeHandler = (page: number) => {
    setQuery({
      page,
    });
  };

  const pageSizeChanged = (page: number, count: number) => {
    setQuery({
      count,
      page,
    });
  };

  const filterChangeHandler = (filter: FilterType) => {
    setQuery({
      friend: filter.friend,
      term: filter.term,
      page: 1,
    });
  };

  const refetch = () => {
    dispatch(fetchUsers(currentPage, pageSize, filter));
  };

  const followUserHandler = (id: number) => {
    dispatch(followUser(id));
  };

  const unfollowUserHandler = (id: number) => {
    dispatch(unfollowUser(id));
  };

  return (
    <section>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <UsersSearchForm onSubmit={filterChangeHandler} />

        <Card>
          {fetchingError ? (
            <Result
              status="error"
              title="Unable to load users"
              subTitle={fetchingError.message}
              extra={[
                <Button
                  type="primary"
                  key="fetchUsers"
                  onClick={refetch}
                  loading={isFetching}
                >
                  Try again
                </Button>,
              ]}
            />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={users}
              loading={isFetching}
              renderItem={(user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  isAuth={isAuth}
                  isFetching={isFetching}
                  usersInFollowingProcess={usersInFollowingProcess}
                  followUser={followUserHandler}
                  unfollowUser={unfollowUserHandler}
                />
              )}
            />
          )}
        </Card>

        <Pagination
          style={{ display: 'flex', justifyContent: 'center' }}
          current={currentPage}
          total={totalUsersCount}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptinos.map((o) => String(o))}
          onChange={pageChangeHandler}
          onShowSizeChange={pageSizeChanged}
        />
      </Space>
    </section>
  );
};
