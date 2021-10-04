import React from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';

import { ChatMessageWithIdType } from '../../../../redux/chat-reducer';

type PropsType = {
  message: ChatMessageWithIdType;
  authId: number | null;
};

export const ChatMessage: React.FC<PropsType> = React.memo(
  ({ message, authId }) => {
    return (
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
    );
  }
);
