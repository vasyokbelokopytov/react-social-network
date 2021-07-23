import React from 'react';
import { connect } from 'react-redux';

import {
  setCurrentPage,
  getUsers,
  followUser,
  unfollowUser,
} from '../../redux/users-reducer';

import Users from './Users';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  pageChangeHandler = (pageNum) => {
    this.props.getUsers(pageNum, this.props.pageSize);
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
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    isFollowing: state.usersPage.isFollowing,
  };
};

export default connect(mapStateToProps, {
  setCurrentPage,
  getUsers,
  followUser,
  unfollowUser,
})(UsersContainer);
