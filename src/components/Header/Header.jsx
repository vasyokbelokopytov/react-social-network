import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src="https://via.placeholder.com/250x70"
        alt="logo"
      ></img>
    </header>
  );
};

export default Header;
