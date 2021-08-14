export const selectProfile = (state) => {
  return state.profilePage.profile;
};

export const selectStatus = (state) => {
  return state.profilePage.status;
};

export const selectPosts = (state) => {
  return state.profilePage.posts;
};
