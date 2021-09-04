import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  loadUserProfile,
  loadUserStatus,
  updateUserStatus,
  addPost,
  savePhoto,
  saveUserProfile,
  setUserProfile,
} from '../../redux/profile-reducer';

import Profile from './Profile';
import {
  selectPosts,
  selectProfile,
  selectStatus,
} from '../../redux/selectors/profile-selectors';

import {
  selectIsAuth,
  selectUserAuthId,
  selectUserAuthProfile,
} from '../../redux/selectors/auth-selectors';
import withOwnerRedirect from '../../hoc/withOwnerRedirect';

class ProfileContainer extends React.Component {
  loadProfilePage() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      this.props.setUserProfile(this.props.authProfile);
      this.props.loadUserStatus(this.props.authUserId);
      return;
    }

    this.props.loadUserProfile(userId);
    this.props.loadUserStatus(userId);
  }

  componentDidMount() {
    this.loadProfilePage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.loadProfilePage();
    }

    if (prevProps.authProfile !== this.props.authProfile) {
      this.loadProfilePage();
    }
  }

  render() {
    return (
      <Profile {...this.props} isOwner={!this.props.match.params.userId} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: selectIsAuth(state),
    authUserId: selectUserAuthId(state),
    profile: selectProfile(state),
    authProfile: selectUserAuthProfile(state),
    status: selectStatus(state),
    posts: selectPosts(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    loadUserProfile,
    loadUserStatus,
    updateUserStatus,
    addPost,
    savePhoto,
    saveUserProfile,
    setUserProfile,
  }),
  withRouter,
  withOwnerRedirect
)(ProfileContainer);
