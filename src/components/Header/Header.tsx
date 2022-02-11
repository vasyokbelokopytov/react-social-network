import React from 'react';
import { useHistory } from 'react-router-dom';

import { Layout, Avatar, Button, Space } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

import styles from './Header.module.css';

import logo from '../../assets/img/logo.png';
import { signOut } from '../../features/auth/authSlice';
import { useErrorMessage } from '../../app/hooks/useErrorMessage';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';

const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const login = useAppSelector((state) => state.auth.login);
  const profile = useAppSelector((state) => state.auth.profile);
  const signingOutError = useAppSelector((state) => state.auth.signingOutError);

  useErrorMessage(signingOutError);

  const dispatch = useAppDispatch();
  const history = useHistory();

  const signOutClickHandler = () => {
    dispatch(signOut());
  };

  const signInClickHandler = () => {
    history.push('/sign-in');
  };

  return (
    <AntHeader className={styles.header}>
      <img className={styles.logo} src={logo} alt="logo"></img>

      {isAuth ? (
        <Space align="center">
          <Avatar
            className={styles.avatar}
            size={40}
            icon={<UserOutlined />}
            src={profile?.photos.small}
          />
          <Text className={styles.login}>{login}</Text>
          <Button
            className={styles.signOut}
            type="link"
            shape="circle"
            icon={<LogoutOutlined style={{ fontSize: '24px' }} />}
            onClick={signOutClickHandler}
          />
        </Space>
      ) : (
        <Button
          className={styles.signIn}
          type="link"
          shape="circle"
          icon={<LoginOutlined style={{ fontSize: '24px' }} />}
          onClick={signInClickHandler}
        ></Button>
      )}
    </AntHeader>
  );
};
