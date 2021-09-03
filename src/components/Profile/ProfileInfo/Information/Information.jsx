import React from 'react';

import styles from './Information.module.css';

import Title from '../../../common/Title/Title';
import InfoItem from './InfoItem/InfoItem';

const Information = (props) => {
  return (
    <section className={styles.information}>
      <Title>Information</Title>
      <div className={styles.wrapper}>
        <InfoItem
          name="Looking for a job"
          value={props.profile.lookingForAJob ? 'Yes' : 'No'}
        />

        {props.profile.lookingForAJobDescription && (
          <InfoItem
            name="Job description"
            value={props.profile.lookingForAJobDescription}
          />
        )}

        {props.profile.aboutMe && (
          <InfoItem name="About me" value={props.profile.aboutMe} />
        )}
      </div>
    </section>
  );
};

export default Information;
