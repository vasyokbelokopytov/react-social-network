import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectIsAuth } from '../../redux/selectors/auth-selectors';

import { Card } from 'antd';

import { LoginForm } from './LoginForm/LoginForm';

import styles from './LoginPage.module.css';

type PropsType = {};

export const LoginPage: React.FC<PropsType> = () => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <Card className={styles.card}>
      <LoginForm />
    </Card>
  );
};
