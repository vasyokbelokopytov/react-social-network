import React, { useEffect, useState } from 'react';
import { Avatar, Button, message, Space, Upload } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';

import {
  followingErrorChanged,
  followUser,
  unfollowUser,
} from '../../features/users/usersSlice';
import { useErrorMessage } from '../../app/hooks/useErrorMessage';
import {
  avatarUpdatingErrorChanged,
  profileFetchingErrorChanged,
  updateAvatar,
} from '../../features/profile/profileSlice';

import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import styles from './AvatarPart.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';

type PropsType = {
  userId: number | null;
  photo: string | null;
  isOwner: boolean;
};

export const AvatarPart: React.FC<PropsType> = ({ photo, isOwner, userId }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isFollowed = useAppSelector((state) => state.profile.followingStatus);
  const followingStatusError = useAppSelector(
    (state) => state.profile.followingStatusError
  );

  const usersInFollowingProcess = useAppSelector(
    (state) => state.users.usersInFollowingProcess
  );
  const subscriptionError = useAppSelector(
    (state) => state.users.followingError
  );

  const isAvatarUpdating = useAppSelector(
    (state) => state.profile.isAvatarUpdating
  );
  const avatarUpdatingError = useAppSelector(
    (state) => state.profile.avatarUpdatingError
  );

  const [isFollowing, setIsFollowing] = useState(() =>
    userId ? usersInFollowingProcess.includes(userId) : false
  );

  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsFollowing(userId ? usersInFollowingProcess.includes(userId) : false);
  }, [isFollowed, userId, usersInFollowingProcess]);

  useEffect(() => {
    if (!avatarUpdatingError && !isAvatarUpdating) {
      setIsUploadVisible(false);
    }
  }, [avatarUpdatingError, isAvatarUpdating]);

  useErrorMessage(subscriptionError, followingErrorChanged);
  useErrorMessage(followingStatusError, profileFetchingErrorChanged, false);
  useErrorMessage(avatarUpdatingError, avatarUpdatingErrorChanged);

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
