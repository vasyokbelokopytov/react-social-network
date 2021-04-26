import React from 'react';
import c from './Profile.module.css';

import User from './User/User';
import Form from './Form/Form';
import Posts from './Posts/Posts';

const Profile = () => {
  return (
    <section className={c.profile}>
      <User />
      <Form />
      <Posts />
    </section>
  );
};

export default Profile;
