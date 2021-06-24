import React from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';

import {
  setUsersAC,
  unfollowAC,
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  toggleLoaderAC,
} from '../../redux/users-reducer';

import Users from './Users';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleLoader();
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleLoader();
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  pageChangeHandler = (pageNum) => {
    this.props.setCurrentPage(pageNum);
    this.props.toggleLoader();
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNum}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toggleLoader();
        this.props.setUsers(response.data.items);
      });
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
        follow={this.props.follow}
        unfollow={this.props.unfollow}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },

    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },

    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },

    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPageAC(currentPage));
    },

    setTotalUsersCount: (totalUsersCount) => {
      dispatch(setTotalUsersCountAC(totalUsersCount));
    },

    toggleLoader: () => {
      dispatch(toggleLoaderAC());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
