import React, { useEffect } from 'react';

import {
  currentPageChanged,
  fetchUsers,
  filterChanged,
  pageSizeChanged,
} from '../../features/users/usersSlice';

import {
  useQueryParams,
  StringParam,
  BooleanParam,
  NumberParam,
} from 'use-query-params';

import { UsersSearchForm } from './UsersSearchForm/UsersSearchForm';

import { Space, Pagination } from 'antd';

import { Filter } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { UsersList } from './UsersList/UsersList';

export const Users: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const pageSize = useAppSelector((state) => state.users.pageSize);
  const pageSizeOptinos = useAppSelector(
    (state) => state.users.pageSizeOptions
  );
  const filter = useAppSelector((state) => state.users.filter);
  const totalUsersCount = useAppSelector(
    (state) => state.users.totalUsersCount
  );
  const currentPage = useAppSelector((state) => state.users.currentPage);

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

  const filterChangeHandler = (filter: Filter) => {
    setQuery({
      friend: filter.friend,
      term: filter.term,
      page: 1,
    });
  };

  const refetch = () => {
    dispatch(fetchUsers({ page: currentPage, pageSize, filter }));
  };

  return (
    <section>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <UsersSearchForm onSubmit={filterChangeHandler} />

        <UsersList refetch={refetch} />

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
