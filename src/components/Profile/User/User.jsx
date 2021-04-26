import React from 'react';
import c from './User.module.css';

const User = () => {
  return (
    <section className={c.user}>
      <img
        className={c.img}
        src="https://via.placeholder.com/185"
        alt="user"
      ></img>

      <div className={c.info}>
        <div className={c.name}>Vasiliy Belokopytov</div>
        <div className={c.description}>
          <div className={c.item}>Date of birth: 19.07.2020</div>
          <div className={c.item}>City: Kyiv</div>
          <div className={c.item}>Education: KPI</div>
          <div className={c.item}>
            Website:{' '}
            <a className={c.link} href="https://github.com/vasyokbelokopytov">
              https://github.com/vasyokbelokopytov
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
