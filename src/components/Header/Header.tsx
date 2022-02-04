import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Avatar, Button, Space } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

import styles from './Header.module.css';

import logo from '../../assets/img/logo.png';
import { signOut } from '../../redux/authSlice';
import { useErrorMessage } from '../../hooks/useErrorMessage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const { Header: AntHeader } = Layout;

type PropsType = {};

export const Header: React.FC<PropsType> = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const login = useAppSelector((state) => state.auth.login);
  const profile = useAppSelector((state) => state.auth.profile);

  const logOutError = useAppSelector((state) => state.auth.signingOutError);

  useErrorMessage(logOutError);

  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(signOut());
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
            className={styles.logOut}
            type="link"
            shape="circle"
            icon={<LogoutOutlined style={{ fontSize: '24px' }} />}
            onClick={clickHandler}
          />
        </Space>
      ) : (
        <Link to="/login">
          <Button
            className={styles.logIn}
            type="link"
            shape="circle"
            icon={<LoginOutlined style={{ fontSize: '24px' }} />}
          ></Button>
        </Link>
      )}
    </AntHeader>
  );
};
