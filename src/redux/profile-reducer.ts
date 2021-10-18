import { ResultCodes } from '../api/api';

import {
  actions as usersActions,
  USER_SUBSCRIBING_SUCCEED,
} from './users-reducer';

import {
  ProfileType,
  UserPhotosType,
  ActionTypes,
  ThunkType,
  ProfileFormDataType,
} from '../types/types';

import { profileAPI } from '../api/profile-api';

const PROFILE_FETCH_REQUESTED = 'profile/PROFILE_FETCH_REQUESTED';
const PROFILE_FETCH_SUCCEED = 'profile/PROFILE_FETCH_SUCCEED';
const PROFILE_FETCH_FAILED = 'profile/PROFILE_FETCH_FAILED';
const PROFILE_FETCHING_ERROR_CHANGED = 'profile/PROFILE_FETCHING_ERROR_CHANGED';

const PROFILE_UPDATE_REQUESTED = 'profile/PROFILE_UPDATE_REQUESTED';
const PROFILE_UPDATE_SUCCEED = 'profile/PROFILE_UPDATE_SUCCEED';
const PROFILE_UPDATE_FAILED = 'profile/PROFILE_UPDATE_FAILED';
const PROFILE_UPDATING_ERROR_CHANGED = 'profile/PROFILE_UPDATING_ERROR_CHANGED';

const FOLLOWING_STATUS_FETCH_REQUESTED =
  'profile/FOLLOWING_STATUS_FETCH_REQUEST';
const FOLLOWING_STATUS_FETCH_SUCCEED = 'profile/FOLLOWING_STATUS_FETCH_SUCCEED';
const FOLLOWING_STATUS_FETCH_FAILED = 'profile/FOLLOWING_STATUS_FETCH_FAILED';
const FOLLOWING_STATUS_ERROR_CHANGED = 'profile/FOLLOWING_STATUS_ERROR_CHANGED';

const STATUS_FETCH_REQUESTED = 'profile/STATUS_FETCH_REQUESTED';
const STATUS_FETCH_SUCCEED = 'profile/STATUS_FETCH_SUCCEED';
const STATUS_FETCH_FAILED = 'profile/STATUS_FETCH_FAILED';
const STATUS_FETCHING_ERROR_CHANGED = 'profile/STATUS_FETCHING_ERROR_CHANGED';

const STATUS_UPDATE_REQUESTED = 'profile/STATUS_UPDATE_REQUESTED';
const STATUS_UPDATE_SUCCEED = 'profile/STATUS_UPDATE_SUCCEED';
const STATUS_UPDATE_FAILED = 'profile/STATUS_UPDATE_FAILED';
const STATUS_UPDATING_ERROR_CHANGED = 'profile/STATUS_UPDATING_ERROR_CHANGED';

const AVATAR_UPDATE_REQUESTED = 'profile/AVATAR_UPDATE_REQUESTED';
const AVATAR_UPDATE_SUCCEED = 'profile/AVATAR_UPDATE_SUCCEED';
const AVATAR_UPDATE_FAILED = 'profile/AVATAR_UPDATE_FAILED';
const AVATAR_UPDATING_ERROR_CHANGED = 'profile/AVATAR_UPDATING_ERROR_CHANGED';

const initialState = {
  profile: null as null | ProfileType,
  isProfileFetching: false,
  isProfileUpdating: false,
  profileFetchingError: null as Error | null,
  profileUpdatingError: null as Error | null,

  followingStatus: false,
  isFollowingStatusFetching: false,
  followingStatusError: null as Error | null,

  status: null as null | string,
  isStatusFetching: false,
  isStatusUpdating: false,
  statusFetchingError: null as Error | null,
  statusUpdatingError: null as Error | null,

  isAvatarUpdating: false,
  avatarUpdatingError: null as Error | null,
};

type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionTypes<typeof actions & typeof usersActions>
): InitialStateType => {
  switch (action.type) {
    case PROFILE_FETCH_REQUESTED:
      return {
        ...state,
        isProfileFetching: true,
      };

    case PROFILE_FETCH_SUCCEED:
      return {
        ...state,
        profile: action.payload,
        isProfileFetching: false,
        profileFetchingError: null,
      };

    case PROFILE_FETCH_FAILED:
      return {
        ...state,
        isProfileFetching: false,
        profileFetchingError: action.error,
      };

    case PROFILE_FETCHING_ERROR_CHANGED:
      return {
        ...state,
        profileFetchingError: action.error,
      };

    case PROFILE_UPDATE_REQUESTED:
      return {
        ...state,
        isProfileUpdating: true,
      };

    case PROFILE_UPDATE_SUCCEED:
      return {
        ...state,
        isProfileUpdating: false,
        profileUpdatingError: null,
      };

    case PROFILE_UPDATE_FAILED:
      return {
        ...state,
        isProfileUpdating: false,
        profileUpdatingError: action.error,
      };

    case PROFILE_UPDATING_ERROR_CHANGED:
      return {
        ...state,
        profileUpdatingError: action.error,
      };

    case FOLLOWING_STATUS_FETCH_REQUESTED:
      return {
        ...state,
        isFollowingStatusFetching: true,
      };

    case FOLLOWING_STATUS_FETCH_SUCCEED:
      return {
        ...state,
        followingStatus: action.payload,
        isFollowingStatusFetching: false,
        followingStatusError: null,
      };

    case FOLLOWING_STATUS_FETCH_FAILED:
      return {
        ...state,
        isFollowingStatusFetching: false,
        followingStatusError: action.error,
      };

    case FOLLOWING_STATUS_ERROR_CHANGED:
      return {
        ...state,
        followingStatusError: action.error,
      };

    case USER_SUBSCRIBING_SUCCEED:
      return {
        ...state,
        followingStatus: action.payload.type === 'follow' ? true : false,
        isFollowingStatusFetching: false,
      };

    case STATUS_FETCH_REQUESTED:
      return {
        ...state,
        isStatusFetching: true,
      };

    case STATUS_FETCH_SUCCEED:
      return {
        ...state,
        status: action.payload,
        isStatusFetching: false,
        statusFetchingError: null,
      };

    case STATUS_FETCH_FAILED:
      return {
        ...state,
        isStatusFetching: false,
        statusFetchingError: action.error,
      };

    case STATUS_FETCHING_ERROR_CHANGED:
      return {
        ...state,
        statusFetchingError: action.error,
      };

    case STATUS_UPDATE_REQUESTED:
      return {
        ...state,
        isStatusUpdating: true,
      };

    case STATUS_UPDATE_SUCCEED:
      return {
        ...state,
        status: action.payload,
        isStatusUpdating: false,
        statusUpdatingError: null,
      };

    case STATUS_UPDATE_FAILED:
      return {
        ...state,
        isStatusUpdating: false,
        statusUpdatingError: action.error,
      };

    case STATUS_UPDATING_ERROR_CHANGED:
      return {
        ...state,
        statusUpdatingError: action.error,
      };

    case AVATAR_UPDATE_REQUESTED:
      return {
        ...state,
        isAvatarUpdating: true,
      };

    case AVATAR_UPDATE_SUCCEED:
      return {
        ...state,
        profile: { ...state.profile, photos: action.payload } as ProfileType,

        isAvatarUpdating: false,
        avatarUpdatingError: null,
      };

    case AVATAR_UPDATE_FAILED:
      return {
        ...state,
        isAvatarUpdating: false,
        avatarUpdatingError: action.error,
      };

    case AVATAR_UPDATING_ERROR_CHANGED:
      return {
        ...state,
        avatarUpdatingError: action.error,
      };

    default:
      return state;
  }
};

export const actions = {
  profileFetchRequested: () =>
    ({
      type: PROFILE_FETCH_REQUESTED,
    } as const),

  profileFetchSucceed: (profile: ProfileType | null) =>
    ({
      type: PROFILE_FETCH_SUCCEED,
      payload: profile,
    } as const),

  profileFetchFailed: (error: Error) =>
    ({
      type: PROFILE_FETCH_FAILED,
      error,
    } as const),

  profileFetchingErrorChanged: (error: Error | null) =>
    ({
      type: PROFILE_FETCHING_ERROR_CHANGED,
      error,
    } as const),

  profileUpdateRequested: () =>
    ({
      type: PROFILE_UPDATE_REQUESTED,
    } as const),

  profileUpdateSucceed: () =>
    ({
      type: PROFILE_UPDATE_SUCCEED,
    } as const),

  profileUpdateFailed: (error: Error) =>
    ({
      type: PROFILE_UPDATE_FAILED,
      error,
    } as const),

  profileUpdatingErrorChanged: (error: Error | null) =>
    ({
      type: PROFILE_UPDATING_ERROR_CHANGED,
      error,
    } as const),

  followingStatusFetchRequested: () =>
    ({
      type: FOLLOWING_STATUS_FETCH_REQUESTED,
    } as const),

  followingStatusFetchSucceed: (followingStatus: boolean) =>
    ({
      type: FOLLOWING_STATUS_FETCH_SUCCEED,
      payload: followingStatus,
    } as const),

  followingStatusFetchFailed: (error: Error) =>
    ({
      type: FOLLOWING_STATUS_FETCH_FAILED,
      error,
    } as const),

  followingStatusErrorChanged: (error: Error) =>
    ({
      type: FOLLOWING_STATUS_ERROR_CHANGED,
      error,
    } as const),

  statusFetchRequested: () =>
    ({
      type: STATUS_FETCH_REQUESTED,
    } as const),

  statusFetchSucceed: (status: string | null) =>
    ({
      type: STATUS_FETCH_SUCCEED,
      payload: status,
    } as const),

  statusFetchFailed: (error: Error) =>
    ({
      type: STATUS_FETCH_FAILED,
      error,
    } as const),

  statusFetchingErrorChanged: (error: Error) =>
    ({
      type: STATUS_FETCHING_ERROR_CHANGED,
      error,
    } as const),

  statusUpdateRequested: () =>
    ({
      type: STATUS_UPDATE_REQUESTED,
    } as const),

  statusUpdateSucceed: (status: string) =>
    ({
      type: STATUS_UPDATE_SUCCEED,
      payload: status,
    } as const),

  statusUpdateFailed: (error: Error) =>
    ({
      type: STATUS_UPDATE_FAILED,
      error,
    } as const),

  statusUpdatingErrorChanged: (error: Error | null) =>
    ({
      type: STATUS_UPDATING_ERROR_CHANGED,
      error,
    } as const),

  avatarUpdateRequested: () =>
    ({
      type: AVATAR_UPDATE_REQUESTED,
    } as const),

  avatarUpdateSucceed: (photos: UserPhotosType) =>
    ({
      type: AVATAR_UPDATE_SUCCEED,
      payload: photos,
    } as const),

  avatarUpdateFailed: (error: Error) =>
    ({
      type: AVATAR_UPDATE_FAILED,
      error,
    } as const),

  avatarUpdatingErrorChanged: (error: Error | null) =>
    ({
      type: AVATAR_UPDATING_ERROR_CHANGED,
      error,
    } as const),
};

export const fetchProfile =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.profileFetchRequested());
    try {
      const profile = await profileAPI.fetchProfile(id);
      dispatch(actions.profileFetchSucceed(profile));
    } catch (e) {
      dispatch(actions.profileFetchFailed(e as Error));
    }
  };

export const updateProfile =
  (profile: ProfileFormDataType | ProfileType): ThunkType =>
  async (dispatch, getState) => {
    dispatch(actions.profileUpdateRequested());

    const id = getState().auth.id;

    try {
      const data = await profileAPI.updateProfile(profile);
      if (data.resultCode === ResultCodes.success) {
        if (id !== null) {
          dispatch(actions.profileUpdateSucceed());
          dispatch(fetchProfile(id));
        } else {
          dispatch(
            actions.profileUpdateFailed(
              new Error("Can't update profile of unauthorized user")
            )
          );
        }
      } else if (data.resultCode === ResultCodes.error) {
        dispatch(actions.profileUpdateFailed(new Error(data.messages[0])));
      }
    } catch (e) {
      dispatch(actions.profileUpdateFailed(e as Error));
    }
  };

export const fetchFollowingStatus =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.followingStatusFetchRequested());

    try {
      const followingStatus = await profileAPI.checkFollowing(id);
      dispatch(actions.followingStatusFetchSucceed(followingStatus));
    } catch (e) {
      dispatch(actions.followingStatusFetchFailed(e as Error));
    }
  };

export const fetchStatus =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.statusFetchRequested());
    try {
      const status = await profileAPI.fetchStatus(id);
      dispatch(actions.statusFetchSucceed(status));
    } catch (e) {
      dispatch(actions.statusFetchFailed(e as Error));
    }
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.statusUpdateRequested());

    try {
      const data = await profileAPI.updateStatus(status);

      if (data.resultCode === ResultCodes.success) {
        dispatch(actions.statusUpdateSucceed(status));
      } else if (data.resultCode === ResultCodes.error) {
        dispatch(actions.statusUpdateFailed(new Error(data.messages[0])));
      }
    } catch (e) {
      dispatch(actions.statusUpdateFailed(e as Error));
    }
  };

export const updateAvatar =
  (file: File): ThunkType =>
  async (dispatch) => {
    dispatch(actions.avatarUpdateRequested());

    try {
      const data = await profileAPI.savePhoto(file);

      if (data.resultCode === ResultCodes.success) {
        dispatch(actions.avatarUpdateSucceed(data.data.photos));
      } else if (data.resultCode === ResultCodes.error) {
        dispatch(actions.avatarUpdateFailed(new Error(data.messages[0])));
      } else {
      }
    } catch (e) {
      dispatch(actions.avatarUpdateFailed(e as Error));
    }
  };

export default profileReducer;
