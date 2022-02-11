import React from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';
import { ChatMessage } from '../../../../app/types';

interface Props {
  message: ChatMessage;
  authId: number | null;
}

export const ChatMessageItem: React.FC<Props> = React.memo(
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
