import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  getUserProfile,
  addPost,
  updateNewPostText,
} from '../../redux/profile-reducer';

import withAuthRedirect from '../../hoc/withAuthRedirect';

import Profile from './Profile';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = 2;
    }

    this.props.getUserProfile(userId);
  }

  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    addPost,
    updateNewPostText,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
