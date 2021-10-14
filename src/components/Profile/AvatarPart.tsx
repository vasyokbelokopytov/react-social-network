import React, { useEffect, useState } from 'react';
import { Avatar, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/selectors/auth-selectors';
import {
  selectFollowingStatus,
  selectFollowingStatusError,
} from '../../redux/selectors/profile-selectors';
import {
  selectFollowingError,
  selectUsersInFollowingProcess,
} from '../../redux/selectors/users-selectors';
import {
  actions as usersActions,
  followUser,
  unfollowUser,
} from '../../redux/users-reducer';
import { useErrorMessage } from '../../hooks/useErrorMessage';
import { actions as profileActions } from '../../redux/profile-reducer';

type PropsType = {
  userId: number | null;
  photo: string | null;
  isOwner: boolean;
};

export const AvatarPart: React.FC<PropsType> = ({ photo, isOwner, userId }) => {
  const isAuth = useSelector(selectIsAuth);
  const isFollowed = useSelector(selectFollowingStatus);
  const followingStatusError = useSelector(selectFollowingStatusError);

  const usersInFollowingProcess = useSelector(selectUsersInFollowingProcess);
  const subscriptionError = useSelector(selectFollowingError);

  const [isFollowing, setIsFollowing] = useState(() =>
    userId ? usersInFollowingProcess.includes(userId) : false
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsFollowing(userId ? usersInFollowingProcess.includes(userId) : false);
  }, [isFollowed, userId, usersInFollowingProcess]);

  useErrorMessage(subscriptionError, usersActions.followingErrorChanged);
  useErrorMessage(
    followingStatusError,
    profileActions.profileFetchingErrorChanged,
    false
  );

  const subscriptionHandler = () => {
    if (isFollowed && userId) {
      dispatch(unfollowUser(+userId));
    } else if (!isFollowed && userId) {
      dispatch(followUser(+userId));
    }
  };

  return (
    <Space direction="vertical" size="middle">
      <Avatar shape="square" size={150} src={photo} />

      {isAuth && !isOwner && !followingStatusError && (
        <Button
          type="primary"
          block
          onClick={subscriptionHandler}
          loading={isFollowing}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </Space>
  );
};
