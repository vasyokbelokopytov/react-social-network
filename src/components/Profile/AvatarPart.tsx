import React, { useEffect, useState } from 'react';
import { Avatar, Button, message, Space, Upload } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/selectors/auth-selectors';
import {
  selectAvatarUpdatingError,
  selectFollowingStatus,
  selectFollowingStatusError,
  selectIsAvatarUpdating,
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
import {
  actions as profileActions,
  updateAvatar,
} from '../../redux/profile-reducer';

import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import styles from './AvatarPart.module.css';

import { ThunkDispatchType } from '../../types/types';

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

  const isAvatarUpdating = useSelector(selectIsAvatarUpdating);
  const avatarUpdatingError = useSelector(selectAvatarUpdatingError);

  const [isFollowing, setIsFollowing] = useState(() =>
    userId ? usersInFollowingProcess.includes(userId) : false
  );

  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const dispatch = useDispatch<ThunkDispatchType>();

  useEffect(() => {
    setIsFollowing(userId ? usersInFollowingProcess.includes(userId) : false);
  }, [isFollowed, userId, usersInFollowingProcess]);

  useEffect(() => {
    if (!avatarUpdatingError && !isAvatarUpdating) {
      setIsUploadVisible(false);
    }
  }, [avatarUpdatingError, isAvatarUpdating]);

  useErrorMessage(subscriptionError, usersActions.followingErrorChanged);
  useErrorMessage(
    followingStatusError,
    profileActions.profileFetchingErrorChanged,
    false
  );
  useErrorMessage(
    avatarUpdatingError,
    profileActions.avatarUpdatingErrorChanged
  );

  const subscriptionHandler = () => {
    if (isFollowed && userId) {
      dispatch(unfollowUser(+userId));
    } else if (!isFollowed && userId) {
      dispatch(followUser(+userId));
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;
    }

    dispatch(updateAvatar(file));
  };

  const mouseOverHandler = () => {
    if (!isAvatarUpdating) {
      setIsUploadVisible(true);
    }
  };

  const mouseLeaveHandler = () => {
    if (!isAvatarUpdating) {
      setIsUploadVisible(false);
    }
  };

  return (
    <Space direction="vertical" size="middle">
      <div
        className={styles.avatarWrapper}
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Upload
          name="avatar"
          accept="image/*"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <div>
            {isAvatarUpdating ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
        <Avatar
          style={isUploadVisible ? { opacity: 0, pointerEvents: 'none' } : {}}
          className={styles.avatar}
          shape="square"
          size={150}
          src={photo}
          icon={<UserOutlined />}
        ></Avatar>
      </div>

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
