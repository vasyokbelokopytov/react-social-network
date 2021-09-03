import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

import logo from '../../assets/img/logo.png';
import userImg from '../../assets/img/user.png';
import logoutImg from '../../assets/img/logout.svg';

const Header = (props) => {
  debugger;
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="logo"></img>

      {props.isAuth ? (
        <div className={styles.user}>
          <img
            className={styles.userImg}
            src={
              props.profile?.photos.small ? props.profile.photos.small : userImg
            }
            alt="user"
          />
          <div className={styles.login}>{props.login}</div>
          <img
            className={styles.logoutIcon}
            src={logoutImg}
            alt="logout"
            onClick={props.logOut}
          />
        </div>
      ) : (
        <Link className={styles.loginButton} to="/login">
          Log In
        </Link>
      )}
    </header>
  );
};

export default Header;
