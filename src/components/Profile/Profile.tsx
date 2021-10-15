import { Button, Card, Result } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import withOwnerRedirect from '../../hoc/withOwnerRedirect';
import { useErrorMessage } from '../../hooks/useErrorMessage';
import {
  actions as profileActions,
  fetchFollowingStatus,
  fetchProfile,
  fetchStatus,
} from '../../redux/profile-reducer';

import {
  selectIsAuth,
  selectUserAuthProfile,
  selectUserAuthStatus,
} from '../../redux/selectors/auth-selectors';
import {
  selectIsProfileFetching,
  selectProfile,
  selectProfileFetchingError,
} from '../../redux/selectors/profile-selectors';
import { AvatarPart } from './AvatarPart';
import { DescriptionForm } from './DescriptionForm';
import { DescriptionPart } from './DescriptionPart';
import { ProfileSkeleton } from './ProfileSkeleton';

import { TitlePart } from './TitlePart';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const profile = useSelector(selectProfile);
  const isProfileFetching = useSelector(selectIsProfileFetching);
  const profileError = useSelector(selectProfileFetchingError);

  const authStatus = useSelector(selectUserAuthStatus);
  const authProfile = useSelector(selectUserAuthProfile);

  const { userId } = useParams<{ userId?: string }>();
  const dispatch = useDispatch();

  const edit = () => {
    setIsEditing(true);
  };

  const loadProfilePage = useCallback(() => {
    if (userId) {
      dispatch(fetchProfile(+userId));
      dispatch(fetchStatus(+userId));
      if (isAuth) dispatch(fetchFollowingStatus(+userId));
      return;
    }

    dispatch(profileActions.statusFetchSucceed(authStatus));
    dispatch(profileActions.profileFetchSucceed(authProfile));
  }, [dispatch, isAuth, authProfile, authStatus, userId]);

  useEffect(() => {
    loadProfilePage();
  }, [loadProfilePage]);

  useEffect(() => {
    return () => {
      dispatch(profileActions.profileFetchSucceed(null));
      dispatch(profileActions.statusFetchSucceed(null));
    };
  }, [dispatch]);

  useErrorMessage(
    profileError,
    profileActions.profileFetchingErrorChanged,
    false
  );

  if (isProfileFetching) return <ProfileSkeleton />;

  if (profileError)
    return (
      <Result
        status="error"
        title="Unable to load profile"
        subTitle={profileError.message}
        extra={[
          <Button
            type="primary"
            key="fetchProfile"
            onClick={loadProfilePage}
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

export const ProfilePage = withOwnerRedirect(Profile);
