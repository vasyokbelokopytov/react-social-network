import React from 'react';
import { Avatar, Button, Space } from 'antd';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/selectors/auth-selectors';

type PropsType = {
  photo: string | null;
  isOwner: boolean;
};

export const AvatarPart: React.FC<PropsType> = ({ isOwner, photo }) => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <Space direction="vertical" size="middle">
      <Avatar shape="square" size={150} src={photo} />

      {isAuth && !isOwner && (
        <Button type="primary" block>
          Follow
        </Button>
      )}
    </Space>
  );
};
