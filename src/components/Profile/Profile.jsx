import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import styles from './Profile.module.css';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostForm from './PostForm/PostForm';
import Posts from './Posts/Posts';
import ProfileInfoForm from './ProfileInfoForm/ProfileInfoForm';

const Profile = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  const addPost = (data) => {
    props.addPost(data.post);
  };

  if (!props.isAuth && props.isOwner) {
    return <Redirect to="/login" />;
  }

  return (
    <section className={styles.profile}>
      {props.profile &&
        (isEdit ? (
          <ProfileInfoForm
            profile={props.profile}
            setIsEdit={setIsEdit}
            saveProfile={props.saveUserProfile}
          />
        ) : (
          <ProfileInfo
            setIsEdit={setIsEdit}
            isOwner={props.isOwner}
            profile={props.profile}
            status={props.status}
            updateUserStatus={props.updateUserStatus}
            savePhoto={props.savePhoto}
          />
        ))}

      {props.isOwner && <PostForm onSubmit={addPost} />}
      <Posts posts={props.posts} />
    </section>
  );
};

export default Profile;
