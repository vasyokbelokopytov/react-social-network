import React from 'react';

import User from './User/User';
import Information from './Information/Information';
import Contacts from './Contacts/Contacts';

const ProfileInfo = (props) => {
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
          (contact) => props.profile.contacts[contact]
        ) && (
          <Contacts isOwner={props.isOwner} contacts={props.profile.contacts} />
        )}
    </>
  );
};

export default ProfileInfo;
