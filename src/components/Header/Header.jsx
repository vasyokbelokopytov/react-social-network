import React from 'react';
import c from './Header.module.css';

const Header = () => {
  return (
    <header className={c.header}>
      <img
        className={c.logo}
        src="https://via.placeholder.com/250x70"
        alt="logo"
      ></img>
    </header>
  );
};

export default Header;
