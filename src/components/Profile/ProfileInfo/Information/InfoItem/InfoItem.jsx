import React from 'react';

import styles from './InfoItem.module.css';

const InfoItem = (props) => {
  return (
    <div className={styles.item}>
      <span className={styles.name}>{props.name}: </span>
      <span className={styles.value}>{props.value}</span>
    </div>
  );
};

export default InfoItem;
