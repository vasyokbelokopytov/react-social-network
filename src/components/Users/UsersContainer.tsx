import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalStateType } from '../../redux/redux-store';

import { loadUsers, followUser, unfollowUser } from '../../redux/users-reducer';

import {
  selectUsers,
  selectCurrentPage,
  selectIsFetching,
  selectFollowedUsers,
  selectPageSize,
  selectTotalUsersCount,
} from '../../redux/selectors/users-selectors';

import { selectIsAuth } from '../../redux/selectors/auth-selectors';

import Users from './Users';

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.loadUsers(this.props.currentPage, this.props.pageSize);
  }

  pageChangeHandler = (pageNum: number) => {
    this.props.loadUsers(pageNum, this.props.pageSize);
  };

  render() {
    return (
      <Users
        users={this.props.users}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        isFetching={this.props.isFetching}
        pageChangeHandler={this.pageChangeHandler}
        followedUsers={this.props.followedUsers}
        followUser={this.props.followUser}
        unfollowUser={this.props.unfollowUser}
        isAuth={this.props.isAuth}
      />
    );
  }
}

const mapStateToProps = (state: GlobalStateType) => {
  return {
    isAuth: selectIsAuth(state),
    users: selectUsers(state),
    pageSize: selectPageSize(state),
    totalUsersCount: selectTotalUsersCount(state),
    currentPage: selectCurrentPage(state),
    isFetching: selectIsFetching(state),
    followedUsers: selectFollowedUsers(state),
  };
};

const connector = connect(mapStateToProps, {
  loadUsers,
  followUser,
  unfollowUser,
});

type MappedPropsType = ConnectedProps<typeof connector>;
type OwnPropsType = {};
export type PropsType = MappedPropsType & OwnPropsType;

export default connector(UsersContainer);
