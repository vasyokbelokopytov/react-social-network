import { GlobalStateType } from '../redux-store';

export const selectProfile = (state: GlobalStateType) => {
  return state.profilePage.profile;
};

export const selectStatus = (state: GlobalStateType) => {
  return state.profilePage.status;
};

export const selectPosts = (state: GlobalStateType) => {
  return state.profilePage.posts;
};
