import React from 'react';
import styles from './Profile.module.css';

import User from './User/User';
import Form from './Form/Form';
import Posts from './Posts/Posts';

const Profile = (props) => {
  return (
    <section className={styles.profile}>
      <User />
      <Form dispatch={props.dispatch} newPostText={props.state.newPostText} />
      <Posts posts={props.state.posts} />
    </section>
  );
};

export default Profile;
