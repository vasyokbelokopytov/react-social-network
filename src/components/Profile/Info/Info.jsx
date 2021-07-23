import React from 'react';
import styles from './Info.module.css';

import userImg from '../../../assets/img/user.png';
import InfoItem from './InfoItem/InfoItem';

const Info = (props) => {
  return (
    <section className={styles.info}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.img}
          src={props.profile?.photos.large ?? userImg}
          alt="user"
        ></img>
      </div>

      <div className={styles.name}>{props.profile.fullName}</div>

      <div className={styles.description}>
        {props.profile.contacts.instagram && (
          <InfoItem name="Instagram" link={props.profile.contacts.instagram} />
        )}

        {props.profile.contacts.facebook && (
          <InfoItem name="Facebook" link={props.profile.contacts.facebook} />
        )}

        {props.profile.contacts.website && (
          <InfoItem name="Website" link={props.profile.contacts.website} />
        )}

        {props.profile.contacts.instagram && (
          <InfoItem name="Instagram" link={props.profile.contacts.instagram} />
        )}

        {props.profile.contacts.instagram && (
          <InfoItem name="Status" content={props.profile.aboutMe} />
        )}
      </div>
    </section>
  );
};

export default Info;
