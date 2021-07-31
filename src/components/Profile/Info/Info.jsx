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
          <InfoItem
            name="Instagram"
            content={props.profile.contacts.instagram}
          />
        )}

        {props.profile.contacts.facebook && (
          <InfoItem name="Facebook" content={props.profile.contacts.facebook} />
        )}

        {props.profile.contacts.website && (
          <InfoItem name="Website" content={props.profile.contacts.website} />
        )}

        {props.profile.contacts.instagram && (
          <InfoItem
            name="Instagram"
            content={props.profile.contacts.instagram}
          />
        )}

        <InfoItem
          editable
          name="Status"
          content={props.status}
          updateInfoItem={props.updateUserStatus}
        />
      </div>
    </section>
  );
};

export default Info;
