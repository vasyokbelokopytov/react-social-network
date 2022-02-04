import React from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar, Spin } from 'antd';
import { ChatPendingMessage } from '../../../../redux/chatSlice';

type PropsType = {
  message: ChatPendingMessage;
  authId: number | null;
};

export const ChatMessage: React.FC<PropsType> = React.memo(
  ({ message, authId }) => {
    return (
      <Spin spinning={message.pending}>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={message.photo} />}
            title={
              <Link
                to={
                  message.userId === authId
                    ? '/profile'
                    : `/profile/${message.userId}`
                }
              >
                {message.userName}
              </Link>
            }
            description={message.message}
          />
        </List.Item>
      </Spin>
    );
  }
);
