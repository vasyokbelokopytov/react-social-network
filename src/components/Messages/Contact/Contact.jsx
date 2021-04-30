import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Contact.module.css';

const Contact = (props) => {
  return (
    <NavLink className={styles.item} to={`/messages/${props.id}`}>
      <img className={styles.img} src={props.img} alt="contact"></img>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.date}>{props.date}</div>
      <div className={styles.text}>{props.text}</div>
    </NavLink>
  );
};

export default Contact;
