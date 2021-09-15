import React from 'react';

import User from './User/User';
import Information from './Information/Information';
import Contacts from './Contacts/Contacts';
import { ProfileType, UserContactsType } from '../../../types/types';

type PropsType = {
  isOwner: boolean;
  profile: ProfileType;
  status: string | null;

  setIsEdit: (isEdit: boolean) => void;
  updateUserStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
};

const ProfileInfo: React.FC<PropsType> = (props) => {
  return (
    <>
      <User
        setIsEdit={props.setIsEdit}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        savePhoto={props.savePhoto}
      />

      <Information isOwner={props.isOwner} profile={props.profile} />

      {props.profile.contacts &&
        Object.keys(props.profile.contacts).some(
          (contact) => props.profile.contacts[contact as keyof UserContactsType]
        ) && (
          <Contacts isOwner={props.isOwner} contacts={props.profile.contacts} />
        )}
    </>
  );
};

export default ProfileInfo;
