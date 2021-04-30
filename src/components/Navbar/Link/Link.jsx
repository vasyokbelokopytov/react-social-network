import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Link.module.css';

const Link = (props) => {
  return (
    <NavLink
      className={styles.link}
      activeClassName={styles.selected}
      to={props.path}
      exact={props.exact}
    >
      <img className={styles.icon} src={props.img} alt="icon"></img>
      <div className={styles.title}>{props.title}</div>
    </NavLink>
  );
};

export default Link;
