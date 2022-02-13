import React, { useEffect, useState } from 'react';
import { Avatar, message, Space, Upload } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';

import { useErrorMessage } from '../../../app/hooks/useErrorMessage';
import { updateAvatar } from '../../../features/profile/profileSlice';

import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import styles from './AvatarPart.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/redux';
import { FollowButton } from './FollowButton';

interface Props {
  userId: number | null;
  photo: string | null;
  isOwner: boolean;
}

export const AvatarPart: React.FC<Props> = ({ photo, isOwner, userId }) => {
  const isAvatarUpdating = useAppSelector(
    (state) => state.profile.isAvatarUpdating
  );
  const avatarUpdatingError = useAppSelector(
    (state) => state.profile.avatarUpdatingError
  );

  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!avatarUpdatingError && !isAvatarUpdating) {
      setIsUploadVisible(false);
    }
  }, [avatarUpdatingError, isAvatarUpdating]);

  useErrorMessage(avatarUpdatingError);

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
    if (!isAvatarUpdating && isOwner) {
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

      <FollowButton isOwner={isOwner} userId={userId} />
    </Space>
  );
};
