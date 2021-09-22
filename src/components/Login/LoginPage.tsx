import React from 'react';
import { Redirect } from 'react-router-dom';
import Title from '../common/Title/Title';
import styles from './Login.module.css';

import LoginForm from './LoginForm/LoginForm';

import { ThunkDispatchType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { actions as authActions, logIn } from '../../redux/auth-reducer';
import {
  selectCaptchaUrl,
  selectIsAuth,
} from '../../redux/selectors/auth-selectors';

type PropsType = {};

export const LoginPage: React.FC<PropsType> = () => {
  const dispatch = useDispatch<ThunkDispatchType<typeof authActions>>();

  const isAuth = useSelector(selectIsAuth);
  const captchaUrl = useSelector(selectCaptchaUrl);

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  const submitHandler = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
  ) => {
    return dispatch(logIn(email, password, rememberMe, captcha));
  };

  return (
    <section className={styles.login}>
      <Title>Please, log in to continue</Title>
      <LoginForm submitHandler={submitHandler} captchaUrl={captchaUrl} />
    </section>
  );
};
