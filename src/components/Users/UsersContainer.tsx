import React from 'react';
import { connect } from 'react-redux';

import { UserType } from '../../types/types';
import { GlobalStateType } from '../../redux/redux-store';

import { loadUsers, followUser, unfollowUser } from '../../redux/users-reducer';

import {
  selectUsers,
  selectCurrentPage,
  selectIsFetching,
  selectIsFollowing,
  selectPageSize,
  selectTotalUsersCount,
} from '../../redux/selectors/users-selectors';

import { selectIsAuth } from '../../redux/selectors/auth-selectors';

import Users from './Users';

type MapStatePropsType = {
  isAuth: boolean;
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  isFollowing: Array<number>;
};

type MapDispatchPropsType = {
  followUser: (id: number) => void;
  unfollowUser: (id: number) => void;
  loadUsers: (pageNum: number, pageSize: number) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

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
        isFollowing={this.props.isFollowing}
        followUser={this.props.followUser}
        unfollowUser={this.props.unfollowUser}
        isAuth={this.props.isAuth}
      />
    );
  }
}

const mapStateToProps = (state: GlobalStateType): MapStatePropsType => {
  return {
    isAuth: selectIsAuth(state),
    users: selectUsers(state),
    pageSize: selectPageSize(state),
    totalUsersCount: selectTotalUsersCount(state),
    currentPage: selectCurrentPage(state),
    isFetching: selectIsFetching(state),
    isFollowing: selectIsFollowing(state),
  };
};

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  GlobalStateType
>(mapStateToProps, {
  loadUsers,
  followUser,
  unfollowUser,
})(UsersContainer);
