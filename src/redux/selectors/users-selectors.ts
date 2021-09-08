import { globalStateType } from '../redux-store';

export const selectUsers = (state: globalStateType) => {
  return state.usersPage.users;
};

export const selectPageSize = (state: globalStateType) => {
  return state.usersPage.pageSize;
};

export const selectTotalUsersCount = (state: globalStateType) => {
  return state.usersPage.totalUsersCount;
};

export const selectCurrentPage = (state: globalStateType) => {
  return state.usersPage.currentPage;
};

export const selectIsFetching = (state: globalStateType) => {
  return state.usersPage.isFetching;
};

export const selectIsFollowing = (state: globalStateType) => {
  return state.usersPage.isFollowing;
};
