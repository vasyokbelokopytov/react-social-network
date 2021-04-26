import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './Link.module.css';

const Link = (props) => {
  return (
    <NavLink className={c.link} activeClassName={c.selected} to={props.path}>
      <img className={c.icon} src={props.img} alt="icon"></img>
      <div className={c.title}>{props.title}</div>
    </NavLink>
  );
};

export default Link;
