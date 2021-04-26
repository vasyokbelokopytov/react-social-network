import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './Contact.module.css';

const Contact = (props) => {
  return (
    <NavLink className={c.item} to={`/messages/${props.id}`}>
      <img className={c.img} src={props.img} alt="contact"></img>
      <div className={c.name}>{props.name}</div>
      <div className={c.date}>{props.date}</div>
      <div className={c.text}>{props.text}</div>
    </NavLink>
  );
};

export default Contact;
