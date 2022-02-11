import { Button, Card, List, Result } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/redux';
import { useErrorMessage } from '../../../app/hooks/useErrorMessage';
import {
  fetchingErrorChanged,
  followingErrorChanged,
  followUser,
  unfollowUser,
} from '../../../features/users/usersSlice';
import { UserItem } from './UsersListItem';

interface Props {
  refetch: () => void;
}

export const UsersList: React.FC<Props> = ({ refetch }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const users = useAppSelector((state) => state.users.users);
  const isFetching = useAppSelector((state) => state.users.isFetching);
  const usersInFollowingProcess = useAppSelector(
    (state) => state.users.usersInFollowingProcess
  );
  const fetchingError = useAppSelector((state) => state.users.fetchingError);
  const followingError = useAppSelector((state) => state.users.followingError);

  const dispatch = useAppDispatch();

  useErrorMessage(fetchingError, fetchingErrorChanged, false);
  useErrorMessage(followingError, followingErrorChanged);

  const followUserHandler = (id: number) => {
    dispatch(followUser(id));
  };

  const unfollowUserHandler = (id: number) => {
    dispatch(unfollowUser(id));
  };

  return (
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
  );
};
