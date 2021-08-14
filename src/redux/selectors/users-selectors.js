export const selectUsers = (state) => {
  return state.usersPage.users;
};

export const selectPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const selectTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const selectCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const selectIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const selectIsFollowing = (state) => {
  return state.usersPage.isFollowing;
};
