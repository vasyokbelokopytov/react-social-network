import { Card } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { useOwnerRedirect } from '../../app/hooks/useOwnerRedirect';
import {
  errorsCleared,
  fetchFollowingStatus,
  fetchProfile,
  fetchStatus,
  isProfileEditingChanged,
  profileChanged,
  statusChanged,
} from '../../features/profile/profileSlice';

import { AvatarPart } from './AvatarPart/AvatarPart';
import { DescriptionForm } from './DescriptionForm';
import { DescriptionPart } from './DescriptionPart/DescriptionPart';
import { ProfileSkeleton } from './ProfileSkeleton';

import { TitlePart } from './TitlePart/TitlePart';
import { ProfileError } from './ProfileError';

export const Profile: React.FC = () => {
  useOwnerRedirect();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const profile = useAppSelector((state) => state.profile.profile);
  const isProfileFetching = useAppSelector(
    (state) => state.profile.isProfileFetching
  );
  const profileError = useAppSelector(
    (state) => state.profile.profileFetchingError
  );

  const authStatus = useAppSelector((state) => state.auth.status);
  const authProfile = useAppSelector((state) => state.auth.profile);

  const { userId } = useParams<{ userId?: string }>();
  const dispatch = useAppDispatch();

  const edit = () => {
    dispatch(isProfileEditingChanged(true));
  };

  const loadProfile = useCallback(() => {
    if (userId) {
      dispatch(fetchProfile(+userId));
      dispatch(fetchStatus(+userId));
      if (isAuth) dispatch(fetchFollowingStatus(+userId));
      return;
    }

    dispatch(statusChanged(authStatus));
    dispatch(profileChanged(authProfile));
  }, [dispatch, isAuth, authProfile, authStatus, userId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    return () => {
      dispatch(statusChanged(null));
      dispatch(profileChanged(null));
      dispatch(errorsCleared());
    };
  }, [dispatch]);

  if (isProfileFetching) return <ProfileSkeleton />;

  if (profileError)
    return (
      <ProfileError
        error={profileError}
        isLoading={isProfileFetching}
        loadProfile={loadProfile}
      />
    );

  if (!profile) return null;

  return (
    <>
      <Card style={{ minHeight: '100%' }}>
        <Card.Meta
          avatar={
            <AvatarPart
              isOwner={!userId}
              photo={profile.photos.large}
              userId={userId ? +userId : null}
            />
          }
          title={
            <TitlePart isOwner={!userId} name={profile.fullName} edit={edit} />
          }
          description={
            <DescriptionPart
              aboutMe={profile.aboutMe}
              isLookingForAJob={profile.lookingForAJob}
              jobDescription={profile.lookingForAJobDescription}
              contacts={profile.contacts}
            />
          }
        />
      </Card>
      <DescriptionForm />
    </>
  );
};
