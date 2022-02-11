import React from 'react';
import { Redirect } from 'react-router-dom';

import { Card } from 'antd';

import { LoginForm } from './SignInForm/SignInForm';

import styles from './SignIn.module.css';
import { useAppSelector } from '../../app/hooks/redux';

export const SignIn: React.FC = () => {
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
