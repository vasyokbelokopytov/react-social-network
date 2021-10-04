import { GlobalStateType } from '../redux-store';

export const selectUsers = (state: GlobalStateType) => {
  return state.usersPage.users;
};

export const selectPageSize = (state: GlobalStateType) => {
  return state.usersPage.pageSize;
};

export const selectPageSizeOptions = (state: GlobalStateType) => {
  return state.usersPage.pageSizeOptions;
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

export const selectFetchingError = (state: GlobalStateType) => {
  return state.usersPage.fetchingError;
};

export const selectUsersInFollowingProcess = (state: GlobalStateType) => {
  return state.usersPage.usersInFollowingProcess;
};

export const selectFollowingError = (state: GlobalStateType) => {
  return state.usersPage.followingError;
};

export const selectFilter = (state: GlobalStateType) => {
  return state.usersPage.filter;
};
