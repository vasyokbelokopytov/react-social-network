import React from 'react';

import { Button, Space, Typography } from 'antd';
import EditOutlined from '@ant-design/icons/EditOutlined';

import { Status } from './Status';

interface Props {
  isOwner: boolean;
  name: string;
  edit: () => void;
}

export const TitlePart: React.FC<Props> = ({ isOwner, name, edit }) => {
  return (
    <Space
      direction="vertical"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={2} style={{ margin: 0 }}>
          {name}
        </Typography.Title>
        {isOwner && (
          <Button icon={<EditOutlined />} onClick={edit}>
            Edit
          </Button>
        )}
      </Space>
      <Status isOwner={isOwner} />
    </Space>
  );
};
