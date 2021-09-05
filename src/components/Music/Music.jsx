import React from 'react';
import styles from './Music.module.css';

import ComingSoon from '../common/ComingSoon/ComingSoon';

const Music = () => {
  return (
    <section className={styles.music}>
      <ComingSoon />
    </section>
  );
};

export default Music;
