import React from 'react';
import styles from './UserPhoto.module.css';

import userImg from '../../../../../assets/img/user.png';
import imageIcon from '../../../../../assets/img/image.svg';

const UserPhoto = (props) => {
  const savePhoto = (e) => {
    if (e.target.files.length > 0) {
      props.savePhoto(e.target.files[0]);
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
