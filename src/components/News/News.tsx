import React from 'react';
import ComingSoon from '../common/ComingSoon/ComingSoon';
import styles from './News.module.css';

const News: React.FC = () => {
  return (
    <section className={styles.news}>
      <ComingSoon />
    </section>
  );
};

export default News;
