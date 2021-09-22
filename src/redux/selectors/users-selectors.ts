import { GlobalStateType } from '../redux-store';

export const selectUsers = (state: GlobalStateType) => {
  return state.usersPage.users;
};

export const selectPageSize = (state: GlobalStateType) => {
  return state.usersPage.pageSize;
};

export const selectTotalUsersCount = (state: GlobalStateType) => {
  return state.usersPage.totalUsersCount;
};

export const selectCurrentPage = (state: GlobalStateType) => {
  return state.usersPage.currentPage;
};

export const selectIsFetching = (state: GlobalStateType) => {
  return state.usersPage.isFetching;
};

export const selectFollowedUsers = (state: GlobalStateType) => {
  return state.usersPage.followedUsers;
};

export const selectFilter = (state: GlobalStateType) => {
  return state.usersPage.filter;
};
