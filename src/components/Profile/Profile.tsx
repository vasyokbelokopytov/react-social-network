import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import withOwnerRedirect from '../../hoc/withOwnerRedirect';
import {
  actions,
  fetchProfile,
  fetchStatus,
} from '../../redux/profile-reducer';
import {
  selectUserAuthId,
  selectUserAuthProfile,
  selectUserAuthStatus,
} from '../../redux/selectors/auth-selectors';
import { selectProfile } from '../../redux/selectors/profile-selectors';
import { AvatarPart } from './AvatarPart';
import { DescriptionForm } from './DescriptionForm';
import { DescriptionPart } from './DescriptionPart';

import { TitlePart } from './TitlePart';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const profile = useSelector(selectProfile);
  const authStatus = useSelector(selectUserAuthStatus);
  const authProfile = useSelector(selectUserAuthProfile);
  const authUserId = useSelector(selectUserAuthId);

  const { userId } = useParams<{ userId?: string }>();
  const dispatch = useDispatch();

  const edit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (!userId) {
      if (authProfile) dispatch(actions.profileFetchSucceed(authProfile));

      if (authUserId) dispatch(actions.statusFetchSucceed(authStatus));
      return;
    }

    dispatch(fetchProfile(+userId));
    dispatch(fetchStatus(+userId));
  }, [dispatch, authProfile, authStatus, authUserId, userId]);

  if (!profile) return null;

  return (
    <>
      <Card style={{ minHeight: '100%' }}>
        <Card.Meta
          avatar={<AvatarPart isOwner={!userId} photo={profile.photos.large} />}
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
