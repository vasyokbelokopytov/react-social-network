import React from 'react';
import styles from './UserPhoto.module.css';

import userImg from '../../../../../assets/img/user.png';
import imageIcon from '../../../../../assets/img/image.svg';

type PropsType = {
  editable: boolean;
  photo: string | null;
  savePhoto: (file: File) => void;
};

const UserPhoto: React.FC<PropsType> = (props) => {
  const savePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      props.savePhoto(e.currentTarget.files[0]);
    }
  };

  return (
    <div className={styles.imgWrapper}>
      <img className={styles.img} src={props.photo ?? userImg} alt="user"></img>

      {props.editable && (
        <label className={styles.editor}>
          <input className={styles.imgInput} type="file" onChange={savePhoto} />
          <img className={styles.imgIcon} src={imageIcon} alt="img" />
        </label>
      )}
    </div>
  );
};

export default UserPhoto;
