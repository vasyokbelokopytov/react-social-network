import React from 'react';

import styles from './Contacts.module.css';

import Title from '../../../common/Title/Title';
import InfoItem from '../Information/InfoItem/InfoItem';
import { UserContactsType } from '../../../../types/types';

type PropsType = {
  isOwner: boolean;
  contacts: UserContactsType;
};

const Contacts: React.FC<PropsType> = (props) => {
  return (
    <section className={styles.information}>
      <Title>Contacts</Title>
      <div className={styles.wrapper}>
        {props.contacts.facebook && (
          <InfoItem name="Facebook" value={props.contacts.facebook} />
        )}

        {props.contacts.vk && <InfoItem name="Vk" value={props.contacts.vk} />}

        {props.contacts.twitter && (
          <InfoItem name="Twitter" value={props.contacts.twitter} />
        )}

        {props.contacts.instagram && (
          <InfoItem name="Instagram" value={props.contacts.instagram} />
        )}

        {props.contacts.youtube && (
          <InfoItem name="YouTube" value={props.contacts.youtube} />
        )}

        {props.contacts.github && (
          <InfoItem name="Github" value={props.contacts.github} />
        )}

        {props.contacts.mainLink && (
          <InfoItem name="Main Link" value={props.contacts.mainLink} />
        )}
      </div>
    </section>
  );
};

export default Contacts;
