import React from 'react';
import { Redirect } from 'react-router-dom';

import { Card } from 'antd';

import { LoginForm } from './LoginForm/LoginForm';

import styles from './LoginPage.module.css';
import { useAppSelector } from '../../hooks/redux';

type PropsType = {};

export const LoginPage: React.FC<PropsType> = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <Card className={styles.card}>
      <LoginForm />
    </Card>
  );
};
