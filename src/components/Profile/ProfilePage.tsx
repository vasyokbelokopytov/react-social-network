import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  actions as profileActions,
  thunks as profileThunks,
} from '../../redux/profile-reducer';

import {
  selectPosts,
  selectProfile,
  selectStatus,
} from '../../redux/selectors/profile-selectors';

import {
  selectUserAuthId,
  selectUserAuthProfile,
} from '../../redux/selectors/auth-selectors';

import { ProfileType, ThunkDispatchType } from '../../types/types';

import ProfileInfoForm from './ProfileInfoForm/ProfileInfoForm';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Posts from './Posts/Posts';
import PostForm from './PostForm/PostForm';

import styles from './Profile.module.css';
import withOwnerRedirect from '../../hoc/withOwnerRedirect';

const Profile: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const authUserId = useSelector(selectUserAuthId);
  const profile = useSelector(selectProfile);
  const authProfile = useSelector(selectUserAuthProfile);
  const status = useSelector(selectStatus);
  const posts = useSelector(selectPosts);

  const dispatch = useDispatch<ThunkDispatchType>();

  const loadUserProfile = useCallback(
    (id: number) => dispatch(profileThunks.loadUserProfile(id)),
    [dispatch]
  );

  const loadUserStatus = useCallback(
    (id: number) => dispatch(profileThunks.loadUserStatus(id)),
    [dispatch]
  );

  const setUserProfile = useCallback(
    (profile: ProfileType) => dispatch(profileActions.setUserProfile(profile)),
    [dispatch]
  );

  const updateUserStatus = (status: string) =>
    dispatch(profileThunks.updateUserStatus(status));

  const addPost = (post: string) => dispatch(profileActions.addPost(post));

  const savePhoto = (file: File) => dispatch(profileThunks.savePhoto(file));

  const saveUserProfile = (profile: ProfileType) =>
    dispatch(profileThunks.saveUserProfile(profile));

  const { userId } = useParams<{ userId?: string }>();
  const isOwner = !userId;

  useEffect(() => {
    if (!userId) {
      if (authProfile) setUserProfile(authProfile);

      if (authUserId) loadUserStatus(authUserId);
      return;
    }

    loadUserProfile(+userId);
    loadUserStatus(+userId);
  }, [
    userId,
    authProfile,
    authUserId,
    loadUserProfile,
    loadUserStatus,
    setUserProfile,
  ]);

  return (
    <section className={styles.profile}>
      {profile &&
        (isEdit ? (
          <ProfileInfoForm
            profile={profile}
            setIsEdit={setIsEdit}
            saveProfile={saveUserProfile}
          />
        ) : (
          <ProfileInfo
            setIsEdit={setIsEdit}
            isOwner={isOwner}
            profile={profile}
            status={status}
            updateUserStatus={updateUserStatus}
            savePhoto={savePhoto}
          />
        ))}

      {isOwner && <PostForm addPost={addPost} />}
      <Posts posts={posts} />
    </section>
  );
};

export const ProfilePage = withOwnerRedirect(Profile);
