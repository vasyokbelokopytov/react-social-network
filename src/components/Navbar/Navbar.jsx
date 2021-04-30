import React from 'react';
import styles from './Navbar.module.css';

import Link from './Link/Link';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link title="Main" exact path="/" img="https://via.placeholder.com/27" />
      <Link
        title="Messages"
        path="/messages"
        img="https://via.placeholder.com/27"
      />
      <Link
        title="Profile"
        path="/profile"
        img="https://via.placeholder.com/27"
      />
      <Link title="News" path="/news" img="https://via.placeholder.com/27" />
      <Link title="Music" path="/music" img="https://via.placeholder.com/27" />
      <Link
        title="Settings"
        path="/settings"
        img="https://via.placeholder.com/27"
      />
    </nav>
  );
};

export default Navbar;
