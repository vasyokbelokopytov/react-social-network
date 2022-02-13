import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthState } from '../auth/authSlice';

import { ResultCodes } from '../../app/api';
import { profileAPI } from './profile-api';

import { Profile, UserPhotos, ProfileFormData } from '../../app/types';

interface ProfileState {
  profile: null | Profile;
  isProfileFetching: boolean;
  isProfileUpdating: boolean;
  profileFetchingError: string | null;
  profileUpdatingError: string | null;
  isProfileEditing: boolean;
  profileUpdatingSucceedMessage: string | null;

  followingStatus: boolean;
  isFollowingStatusFetching: boolean;
  followingStatusError: string | null;

  status: null | string;
  isStatusFetching: boolean;
  isStatusUpdating: boolean;
  statusFetchingError: string | null;
  statusUpdatingError: string | null;

  isAvatarUpdating: boolean;
  avatarUpdatingError: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isProfileFetching: false,
  isProfileUpdating: false,
  profileFetchingError: null,
  profileUpdatingError: null,
  isProfileEditing: false,
  profileUpdatingSucceedMessage: null,

  followingStatus: false,
  isFollowingStatusFetching: false,
  followingStatusError: null,

  status: null,
  isStatusFetching: false,
  isStatusUpdating: false,
  statusFetchingError: null,
  statusUpdatingError: null,

  isAvatarUpdating: false,
  avatarUpdatingError: null,
};

export const fetchProfile = createAsyncThunk<
  Profile,
  number,
  { rejectValue: string }
>('fetchProfile', async (id, { rejectWithValue }) => {
  try {
    return await profileAPI.fetchProfile(id);
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to fetch profile'
    );
  }
});

export const updateProfile = createAsyncThunk<
  void,
  Profile | ProfileFormData,
  { rejectValue: string }
>('updateProfile', async (profile, { getState, rejectWithValue, dispatch }) => {
  const state = getState() as { auth: AuthState };
  const id = state.auth.id;

  try {
    const data = await profileAPI.updateProfile(profile);
    if (data.resultCode === ResultCodes.success) {
      if (id !== null) {
        dispatch(fetchProfile(id));
      } else {
        return rejectWithValue('Unable to update profile of unauthorized user');
      }
    } else if (data.resultCode === ResultCodes.error) {
      return rejectWithValue(data.messages[0]);
    }
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to update profile'
    );
  }
});

export const fetchFollowingStatus = createAsyncThunk<
  boolean,
  number,
  { rejectValue: string }
>('fetchFollowingStatus', async (id, { rejectWithValue }) => {
  try {
    return await profileAPI.checkFollowing(id);
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to update following status'
    );
  }
});

export const fetchStatus = createAsyncThunk<
  string | null,
  number,
  { rejectValue: string }
>('fetchStatus', async (id, { rejectWithValue }) => {
  try {
    return await profileAPI.fetchStatus(id);
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to fetch status'
    );
  }
});

export const updateStatus = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('updateStatus', async (status, { rejectWithValue }) => {
  try {
    const data = await profileAPI.updateStatus(status);

    if (data.resultCode === ResultCodes.success) {
      return status;
    } else if (data.resultCode === ResultCodes.error) {
      return rejectWithValue(data.messages[0]);
    }
    return rejectWithValue('Unknown result code');
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to update status'
    );
  }
});

export const updateAvatar = createAsyncThunk<
  UserPhotos,
  File,
  { rejectValue: string }
>('updateAvatar', async (file, { rejectWithValue }) => {
  try {
    const data = await profileAPI.savePhoto(file);

    if (data.resultCode === ResultCodes.success) {
      return data.data.photos;
    } else if (data.resultCode === ResultCodes.error) {
      return rejectWithValue(data.messages[0]);
    }

    return rejectWithValue('Unknown result code');
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to update avatar'
    );
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileChanged: (state, { payload }) => {
      state.profile = payload;
    },

    statusChanged: (state, { payload }) => {
      state.status = payload;
    },

    isProfileEditingChanged: (state, { payload }) => {
      state.isProfileEditing = payload;
    },

    errorsCleared: (state) => {
      state.avatarUpdatingError = null;
      state.statusFetchingError = null;
      state.statusUpdatingError = null;
      state.followingStatusError = null;
      state.profileFetchingError = null;
      state.profileUpdatingError = null;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isProfileFetching = true;
        state.profileFetchingError = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.isProfileFetching = false;
        state.profile = payload;
      })
      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.isProfileFetching = false;
        state.profileFetchingError = payload || null;
      })

      .addCase(updateProfile.pending, (state) => {
        state.isProfileUpdating = true;
        state.profileUpdatingError = null;
        state.profileUpdatingSucceedMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isProfileUpdating = false;
        state.profileUpdatingSucceedMessage = 'Profile update succeed!';
        state.isProfileEditing = false;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isProfileUpdating = false;
        state.profileUpdatingError = payload || null;
      })

      .addCase(fetchFollowingStatus.pending, (state) => {
        state.isFollowingStatusFetching = true;
        state.followingStatusError = null;
      })
      .addCase(fetchFollowingStatus.fulfilled, (state, { payload }) => {
        state.isFollowingStatusFetching = false;
        state.followingStatus = payload;
      })
      .addCase(fetchFollowingStatus.rejected, (state, { payload }) => {
        state.isFollowingStatusFetching = false;
        state.followingStatusError = payload || null;
      })

      .addCase(fetchStatus.pending, (state) => {
        state.isStatusFetching = true;
        state.statusFetchingError = null;
      })
      .addCase(fetchStatus.fulfilled, (state, { payload }) => {
        state.isStatusFetching = false;
        state.status = payload;
      })
      .addCase(fetchStatus.rejected, (state, { payload }) => {
        state.isStatusFetching = false;
        state.statusFetchingError = payload || null;
      })

      .addCase(updateStatus.pending, (state) => {
        state.isStatusUpdating = true;
        state.statusUpdatingError = null;
      })
      .addCase(updateStatus.fulfilled, (state, { payload }) => {
        state.isStatusUpdating = false;
        state.status = payload;
      })
      .addCase(updateStatus.rejected, (state, { payload }) => {
        state.isStatusUpdating = false;
        state.statusUpdatingError = payload || null;
      })

      .addCase(updateAvatar.pending, (state) => {
        state.isAvatarUpdating = true;
        state.avatarUpdatingError = null;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.isAvatarUpdating = false;
        state.profile = {
          ...state.profile,
          photos: payload,
        } as Profile;
      })
      .addCase(updateAvatar.rejected, (state, { payload }) => {
        state.isAvatarUpdating = false;
        state.avatarUpdatingError = payload || null;
      }),
});

export const {
  profileChanged,
  statusChanged,
  isProfileEditingChanged,
  errorsCleared,
} = profileSlice.actions;

export default profileSlice.reducer;
