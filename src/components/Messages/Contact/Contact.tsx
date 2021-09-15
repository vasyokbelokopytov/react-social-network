import React from 'react';
import { NavLink } from 'react-router-dom';
import { ContactType } from '../../../types/types';
import styles from './Contact.module.css';

type PropsType = ContactType;

const Contact: React.FC<PropsType> = (props) => {
  return (
    <NavLink
      className={styles.item}
      to={`/messages/${props.id}`}
      activeClassName={styles.selected}
    >
      <img className={styles.img} src={props.img} alt="contact"></img>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.date}>{props.date}</div>
      <div className={styles.text}>{props.text}</div>
    </NavLink>
  );
};

export default Contact;
