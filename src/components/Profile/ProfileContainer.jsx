import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  addPost,
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
    this.props.getUserStatus(userId);
  }

  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    posts: state.profilePage.posts,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    addPost,
  }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
