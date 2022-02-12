import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export const Navbar: React.FC = () => {
  const location = useLocation();
  const base = location.pathname.split('/').slice(0, 2).join('/');

  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        selectedKeys={[base]}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Main</Link>
        </Menu.Item>
        <Menu.Item key="/chat" icon={<MessageOutlined />}>
          <Link to="/chat">Chat</Link>
        </Menu.Item>
        <Menu.Item key="/profile" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="/users" icon={<SearchOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
