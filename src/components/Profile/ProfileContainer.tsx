import React from 'react';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GlobalStateType } from '../../redux/redux-store';

import withOwnerRedirect from '../../hoc/withOwnerRedirect';

import {
  actions as profileActions,
  loadUserProfile,
  loadUserStatus,
  updateUserStatus,
  savePhoto,
  saveUserProfile,
} from '../../redux/profile-reducer';

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

import Profile from './Profile';

class ProfileContainer extends React.Component<PropsType> {
  loadProfilePage() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      if (this.props.authProfile)
        this.props.setUserProfile(this.props.authProfile);

      if (this.props.authUserId)
        this.props.loadUserStatus(this.props.authUserId);
      return;
    }

    this.props.loadUserProfile(+userId);
    this.props.loadUserStatus(+userId);
  }

  componentDidMount() {
    this.loadProfilePage();
  }

  componentDidUpdate(prevProps: PropsType) {
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

const mapStateToProps = (state: GlobalStateType) => {
  return {
    isAuth: selectIsAuth(state),
    authUserId: selectUserAuthId(state),
    profile: selectProfile(state),
    authProfile: selectUserAuthProfile(state),
    status: selectStatus(state),
    posts: selectPosts(state),
  };
};

const connector = connect(mapStateToProps, {
  loadUserProfile,
  loadUserStatus,
  updateUserStatus,
  addPost: profileActions.addPost,
  savePhoto,
  saveUserProfile,
  setUserProfile: profileActions.setUserProfile,
});

type MappedPropsType = ConnectedProps<typeof connector>;
type RouterParamsType = { userId: string };
type RouterProps = RouteComponentProps<RouterParamsType>;
type OwnProps = {};
export type PropsType = MappedPropsType & OwnProps & RouterProps;

export default compose<React.ComponentType>(
  connector,
  withRouter,
  withOwnerRedirect
)(ProfileContainer);
