import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/redux';
import { useErrorMessage } from '../../../app/hooks/useErrorMessage';
import { followUser, unfollowUser } from '../../../features/users/usersSlice';

interface Props {
  userId: number | null;
  isOwner: boolean;
}

export const FollowButton: React.FC<Props> = ({ isOwner, userId }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const isFollowed = useAppSelector((state) => state.profile.followingStatus);
  const followingStatusError = useAppSelector(
    (state) => state.profile.followingStatusError
  );

  const usersInFollowingProcess = useAppSelector(
    (state) => state.users.usersInFollowingProcess
  );

  const [isFollowing, setIsFollowing] = useState(() =>
    userId ? usersInFollowingProcess.includes(userId) : false
  );
  const subscriptionError = useAppSelector(
    (state) => state.users.followingError
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsFollowing(userId ? usersInFollowingProcess.includes(userId) : false);
  }, [isFollowed, userId, usersInFollowingProcess]);

  useErrorMessage(subscriptionError);
  useErrorMessage(followingStatusError);

  const subscriptionHandler = () => {
    if (isFollowed && userId) {
      dispatch(unfollowUser(+userId));
    } else if (!isFollowed && userId) {
      dispatch(followUser(+userId));
    }
  };

  if (isAuth && !isOwner && !followingStatusError) {
    return (
      <Button
        type="primary"
        block
        onClick={subscriptionHandler}
        loading={isFollowing}
      >
        {isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    );
  }

  return null;
};
