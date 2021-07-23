import React from 'react';
import styles from './Profile.module.css';

import Info from './Info/Info';
import Form from './Form/Form';
import Posts from './Posts/Posts';

const Profile = (props) => {
  return (
    <section className={styles.profile}>
      {props.profile && <Info profile={props.profile} />}

      <Form
        newPostText={props.newPostText}
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
      />
      <Posts posts={props.posts} />
    </section>
  );
};

export default Profile;
