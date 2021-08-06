import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Login.module.css';

import LoginForm from './LoginForm/LoginForm';

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <section className={styles.login}>
      <h1 className={styles.title}>Please, log in to continue</h1>
      <LoginForm logIn={props.logIn} />
    </section>
  );
};

export default Login;
