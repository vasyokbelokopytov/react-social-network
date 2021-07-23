import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

import userImg from '../../assets/img/user.png';

const Header = (props) => {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src="https://via.placeholder.com/250x70"
        alt="logo"
      ></img>

      {props.isAuth ? (
        <div className={styles.user}>
          <img
            className={styles.userImg}
            src={
              props.profile?.photos.large ? props.profile.photos.large : userImg
            }
            alt="user"
          />
          <div className={styles.login}>{props.login}</div>
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
