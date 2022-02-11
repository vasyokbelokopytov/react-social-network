import { Button, Card, Result } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { useErrorMessage } from '../../app/hooks/useErrorMessage';
import { useOwnerRedirect } from '../../app/hooks/useOwnerRedirect';
import {
  fetchFollowingStatus,
  fetchProfile,
  fetchStatus,
  profileChanged,
  profileFetchingErrorChanged,
  statusChanged,
} from '../../features/profile/profileSlice';

import { AvatarPart } from './AvatarPart';
import { DescriptionForm } from './DescriptionForm';
import { DescriptionPart } from './DescriptionPart';
import { ProfileSkeleton } from './ProfileSkeleton';

import { TitlePart } from './TitlePart';

export const Profile: React.FC = () => {
  useOwnerRedirect();
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(true);
  };

  const loadprofile = useCallback(() => {
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
    loadprofile();
  }, [loadprofile]);

  useEffect(() => {
    return () => {
      dispatch(statusChanged(null));
      dispatch(profileChanged(null));
    };
  }, [dispatch]);

  useErrorMessage(profileError, profileFetchingErrorChanged, false);

  if (isProfileFetching) return <ProfileSkeleton />;

  if (profileError)
    return (
      <Result
        status="error"
        title="Unable to load profile"
        subTitle={profileError}
        extra={[
          <Button
            type="primary"
            key="fetchProfile"
            onClick={loadprofile}
            loading={isProfileFetching}
          >
            Try again
          </Button>,
        ]}
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
      <DescriptionForm isEditing={isEditing} setIsEditing={setIsEditing} />
    </>
  );
};
