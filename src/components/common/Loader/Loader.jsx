import React from 'react';
import styles from './Loader.module.css';
import loader from '../../../assets/img/loader.svg';

const Loader = (props) => {
  return <img className={styles.img} src={loader} alt="loader" />;
};

export default Loader;
