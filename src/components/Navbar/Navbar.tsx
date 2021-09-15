import React from 'react';
import styles from './Navbar.module.css';

import Link from './Link/Link';

import mainImg from '../../assets/img/Navbar/main.svg';
import messagesImg from '../../assets/img/Navbar/messages.svg';
import profileImg from '../../assets/img/Navbar/profile.svg';
import usersImg from '../../assets/img/Navbar/users.svg';
import newsImg from '../../assets/img/Navbar/news.svg';
import musicImg from '../../assets/img/Navbar/music.svg';
import settingsImg from '../../assets/img/Navbar/settings.svg';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Link title="Main" exact path="/" img={mainImg} />
      <Link title="Messages" path="/messages" img={messagesImg} />
      <Link title="Profile" path="/profile" img={profileImg} />
      <Link title="Users" path="/users" img={usersImg} />
      <Link title="News" path="/news" img={newsImg} />
      <Link title="Music" path="/music" img={musicImg} />
      <Link title="Settings" path="/settings" img={settingsImg} />
    </nav>
  );
};

export default Navbar;
