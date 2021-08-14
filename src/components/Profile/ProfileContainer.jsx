import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  loadUserProfile,
  loadUserStatus,
  updateUserStatus,
  addPost,
} from '../../redux/profile-reducer';

import withAuthRedirect from '../../hoc/withAuthRedirect';

import Profile from './Profile';
import {
  selectPosts,
  selectProfile,
  selectStatus,
} from '../../redux/selectors/profile-selectors';
import {
  selectIsAuth,
  selectUserAuthId,
} from '../../redux/selectors/auth-selectors';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId ?? this.props.authUserId;

    this.props.loadUserProfile(userId);
    this.props.loadUserStatus(userId);
  }

  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: selectIsAuth(state),
    authUserId: selectUserAuthId(state),
    profile: selectProfile(state),
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
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
