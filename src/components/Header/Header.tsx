import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuth,
  selectUserAuthLogin,
  selectUserAuthProfile,
} from '../../redux/selectors/auth-selectors';

import { Layout, Avatar, Button, Space } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

import styles from './Header.module.css';

import logo from '../../assets/img/logo.png';
import { logOut } from '../../redux/auth-reducer';

const { Header: AntHeader } = Layout;

type PropsType = {};

export const Header: React.FC<PropsType> = () => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectUserAuthLogin);
  const profile = useSelector(selectUserAuthProfile);

  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(logOut());
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
