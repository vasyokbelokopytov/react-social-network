import React from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar, Skeleton, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { UserType } from '../../../types/types';

type PropsType = {
  user: UserType;
  usersInFollowingProcess: Array<number>;
  followUser: (id: number) => void;
  unfollowUser: (id: number) => void;
  isAuth: boolean;
  isFetching: boolean;
};

export const UserItem: React.FC<PropsType> = React.memo(
  ({
    user,
    isAuth,
    isFetching,
    usersInFollowingProcess,
    followUser,
    unfollowUser,
  }) => {
    const follow = () => {
      followUser(user.id);
    };

    const unfollow = () => {
      unfollowUser(user.id);
    };

    if (isFetching) {
      return (
        <List.Item actions={[<Skeleton.Button active />]}>
          <List.Item.Meta
            avatar={<Skeleton.Avatar active />}
            title={
              <Skeleton
                active
                paragraph={false}
                title={{ style: { margin: 4 } }}
              />
            }
          />
        </List.Item>
      );
    }

    return (
      <List.Item
        actions={[
          isAuth && user.followed ? (
            <Button
              type="link"
              style={{ width: 100 }}
              onClick={unfollow}
              disabled={usersInFollowingProcess.includes(user.id)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              type="link"
              style={{ width: 100 }}
              onClick={follow}
              disabled={usersInFollowingProcess.includes(user.id)}
            >
              Follow
            </Button>
          ),
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={user.photos.small} icon={<UserOutlined />} />}
          title={<Link to={`/profile/${user.id}`}>{user.name}</Link>}
          description={user.status}
        />
      </List.Item>
    );
  }
);
