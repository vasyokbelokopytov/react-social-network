import React from 'react';
import { ProfileType } from '../../../../types/types';
import styles from './User.module.css';

import UserInfoItem from './UserInfoItem/UserInfoItem';
import UserPhoto from './UserPhoto/UserPhoto';

type PropsType = {
  setIsEdit: (isEdit: boolean) => void;
  isOwner: boolean;
  profile: ProfileType;
  status: string | null;
  updateUserStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
};

const User: React.FC<PropsType> = (props) => {
  const clickHandler = () => {
    props.setIsEdit(true);
  };

  return (
    <section className={styles.info}>
      <UserPhoto
        editable={props.isOwner}
        photo={props.profile?.photos.large}
        savePhoto={props.savePhoto}
      />

      <div className={styles.name}>{props.profile.fullName}</div>

      <div className={styles.info}>
        <UserInfoItem
          isOwner={props.isOwner}
          editable={props.isOwner}
          name="Status"
          content={props.status ?? ''}
          updateInfoItem={props.updateUserStatus}
        />
      </div>

      {props.isOwner && (
        <button className={styles.button} onClick={clickHandler}>
          Edit
        </button>
      )}
    </section>
  );
};

export default User;
