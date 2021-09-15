import React, { useState } from 'react';

import styles from './Profile.module.css';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostForm from './PostForm/PostForm';
import Posts from './Posts/Posts';
import ProfileInfoForm from './ProfileInfoForm/ProfileInfoForm';
import { FormReturnType, PostType, ProfileType } from '../../types/types';

type PropsType = {
  isOwner: boolean;

  isAuth: boolean;
  authUserId: number | null;
  profile: ProfileType | null;
  authProfile: ProfileType | null;
  status: string | null;
  posts: Array<PostType>;

  loadUserProfile: (id: number) => void;
  loadUserStatus: (id: number) => void;
  updateUserStatus: (status: string) => void;
  addPost: (postText: string) => void;
  savePhoto: (file: File) => void;
  saveUserProfile: (profile: ProfileType) => FormReturnType;
  setUserProfile: (profile: ProfileType) => void;
};

const Profile: React.FC<PropsType> = (props) => {
  const [isEdit, setIsEdit] = useState(false);

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

      {props.isOwner && <PostForm addPost={props.addPost} />}
      <Posts posts={props.posts} />
    </section>
  );
};

export default Profile;
