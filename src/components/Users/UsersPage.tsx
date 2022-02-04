import React, { useEffect } from 'react';

import {
  currentPageChanged,
  fetchingErrorChanged,
  fetchUsers,
  filterChanged,
  followingErrorChanged,
  followUser,
  pageSizeChanged,
  unfollowUser,
} from '../../redux/usersSlice';

import {
  useQueryParams,
  StringParam,
  BooleanParam,
  NumberParam,
} from 'use-query-params';

import { UserItem } from './UserItem/UserItem';
import { UsersSearchForm } from './UsersSearchForm/UsersSearchForm';

import { Card, List, Space, Pagination, Result, Button } from 'antd';

import { FilterType } from '../../types/types';
import { useErrorMessage } from '../../hooks/useErrorMessage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

type PropsType = {};

export const UsersPage: React.FC<PropsType> = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const users = useAppSelector((state) => state.users.users);
  const pageSize = useAppSelector((state) => state.users.pageSize);
  const pageSizeOptinos = useAppSelector(
    (state) => state.users.pageSizeOptions
  );
  const filter = useAppSelector((state) => state.users.filter);
  const totalUsersCount = useAppSelector(
    (state) => state.users.totalUsersCount
  );
  const currentPage = useAppSelector((state) => state.users.currentPage);
  const isFetching = useAppSelector((state) => state.users.isFetching);
  const fetchingError = useAppSelector((state) => state.users.fetchingError);
  const usersInFollowingProcess = useAppSelector(
    (state) => state.users.usersInFollowingProcess
  );
  const followingError = useAppSelector((state) => state.users.followingError);

  const dispatch = useAppDispatch();

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

    dispatch(filterChanged({ friend, term }));
    dispatch(currentPageChanged(page));
    dispatch(pageSizeChanged(count));

    dispatch(fetchUsers({ filter: { term, friend }, pageSize, page }));
  }, [dispatch, pageSize, pageSizeOptinos, query, isAuth]);

  useErrorMessage(fetchingError, fetchingErrorChanged, false);
  useErrorMessage(followingError, followingErrorChanged);

  const pageChangeHandler = (page: number) => {
    setQuery({
      page,
    });
  };

  const pageSizeChangeHandler = (page: number, count: number) => {
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
    dispatch(fetchUsers({ page: currentPage, pageSize, filter }));
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
              subTitle={fetchingError}
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
          onShowSizeChange={pageSizeChangeHandler}
        />
      </Space>
    </section>
  );
};
