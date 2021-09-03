import React from 'react';
import { Redirect } from 'react-router-dom';
import Title from '../common/Title/Title';
import styles from './Login.module.css';

import LoginForm from './LoginForm/LoginForm';

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <section className={styles.login}>
      <Title>Please, log in to continue</Title>
      <LoginForm logIn={props.logIn} captchaUrl={props.captchaUrl} />
    </section>
  );
};

export default Login;
