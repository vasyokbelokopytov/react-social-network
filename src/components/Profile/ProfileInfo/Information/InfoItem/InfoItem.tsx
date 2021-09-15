import React from 'react';

import styles from './InfoItem.module.css';

type PropsType = {
  name: string;
  value: string;
};

const InfoItem: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.item}>
      <span className={styles.name}>{props.name}: </span>
      <span className={styles.value}>{props.value}</span>
    </div>
  );
};

export default InfoItem;
