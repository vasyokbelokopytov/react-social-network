import React from 'react';
import styles from './Profile.module.css';

import User from './User/User';
import FormContainer from './Form/FormContainer';
import PostsContainer from './Posts/PostsContainer';

const Profile = (props) => {
  return (
    <section className={styles.profile}>
      <User />
      <FormContainer
      // store={props.store}
      />
      <PostsContainer
      // store={props.store}
      />
    </section>
  );
};

export default Profile;
