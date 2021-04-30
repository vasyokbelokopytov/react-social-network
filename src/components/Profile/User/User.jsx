import React from 'react';
import styles from './User.module.css';

const User = () => {
  return (
    <section className={styles.user}>
      <img
        className={styles.img}
        src="https://via.placeholder.com/185"
        alt="user"
      ></img>

      <div className={styles.info}>
        <div className={styles.name}>Vasiliy Belokopytov</div>
        <div className={styles.description}>
          <div className={styles.item}>Date of birth: 19.07.2020</div>
          <div className={styles.item}>City: Kyiv</div>
          <div className={styles.item}>Education: KPI</div>
          <div className={styles.item}>
            Website:{' '}
            <a
              className={styles.link}
              href="https://github.com/vasyokbelokopytov"
            >
              https://github.com/vasyokbelokopytov
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
