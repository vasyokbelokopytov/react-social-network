import React from 'react';
import styles from './Profile.module.css';

import Info from './Info/Info';
import ProfileForm from './ProfileForm/ProfileForm';
import Posts from './Posts/Posts';

const Profile = (props) => {
  const addPost = (data) => {
    props.addPost(data.post);
  };

  return (
    <section className={styles.profile}>
      {props.profile && (
        <Info
          profile={props.profile}
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />
      )}

      <ProfileForm onSubmit={addPost} />
      <Posts posts={props.posts} />
    </section>
  );
};

export default Profile;
