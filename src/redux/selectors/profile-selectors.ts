import { GlobalStateType } from '../redux-store';

export const selectProfile = (state: GlobalStateType) => {
  return state.profilePage.profile;
};

export const selectIsProfileFetching = (state: GlobalStateType) => {
  return state.profilePage.isProfileFetching;
};

export const selectIsProfileUpdating = (state: GlobalStateType) => {
  return state.profilePage.isProfileUpdating;
};

export const selectProfileFetchingError = (state: GlobalStateType) => {
  return state.profilePage.profileFetchingError;
};

export const selectProfileUpdatingError = (state: GlobalStateType) => {
  return state.profilePage.profileUpdatingError;
};

export const selectFollowingStatus = (state: GlobalStateType) => {
  return state.profilePage.followingStatus;
};

export const selectIsFollowingStatusFetching = (state: GlobalStateType) => {
  return state.profilePage.isFollowingStatusFetching;
};

export const selectFollowingStatusError = (state: GlobalStateType) => {
  return state.profilePage.followingStatusError;
};

export const selectStatus = (state: GlobalStateType) => {
  return state.profilePage.status;
};

export const selectIsStatusFetching = (state: GlobalStateType) => {
  return state.profilePage.isStatusFetching;
};

export const selectIsStatusUpdating = (state: GlobalStateType) => {
  return state.profilePage.isStatusUpdating;
};

export const selectStatusFetchingError = (state: GlobalStateType) => {
  return state.profilePage.statusFetchingError;
};

export const selectStatusUpdatingError = (state: GlobalStateType) => {
  return state.profilePage.statusUpdatingError;
};

export const selectIsAvatarUpdating = (state: GlobalStateType) => {
  return state.profilePage.isAvatarUpdating;
};

export const selectAvatarUpdatingError = (state: GlobalStateType) => {
  return state.profilePage.avatarUpdatingError;
};
