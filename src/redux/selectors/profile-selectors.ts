import { globalStateType } from '../redux-store';

export const selectProfile = (state: globalStateType) => {
  return state.profilePage.profile;
};

export const selectStatus = (state: globalStateType) => {
  return state.profilePage.status;
};

export const selectPosts = (state: globalStateType) => {
  return state.profilePage.posts;
};
