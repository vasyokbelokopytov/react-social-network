import React from 'react';
import { connect } from 'react-redux';

import {
  setCurrentPage,
  loadUsers,
  followUser,
  unfollowUser,
} from '../../redux/users-reducer';

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

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.loadUsers(this.props.currentPage, this.props.pageSize);
  }

  pageChangeHandler = (pageNum) => {
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

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, {
  setCurrentPage,
  loadUsers,
  followUser,
  unfollowUser,
})(UsersContainer);
