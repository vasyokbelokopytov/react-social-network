import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { CaptchaResultCodes, ResultCodes } from '../../app/api';
import { authAPI } from './auth-api';
import { profileAPI } from '../profile/profile-api';

import { AuthData, Profile, SignInPayload } from '../../app/types';

export interface AuthState {
  id: null | number;
  email: null | string;
  login: null | string;
  profile: null | Profile;
  status: null | string;

  captcha: null | string;
  captchaError: null | string;

  isAuth: boolean;
  isAuthorizing: boolean;
  authError: null | string;

  isSigningIn: boolean;
  signingInError: string | null;

  isSigningUp: boolean;
  signingUpError: string | null;

  isSigningOut: boolean;
  signingOutError: string | null;
}

const initialState: AuthState = {
  id: null,
  email: null,
  login: null,
  profile: null,
  status: null,

  captcha: null,
  captchaError: null,

  isAuth: false,
  isAuthorizing: false,
  authError: null,

  isSigningIn: false,
  signingInError: null,

  isSigningUp: false,
  signingUpError: null,

  isSigningOut: false,
  signingOutError: null,
};

export const auth = createAsyncThunk<AuthData, void, { rejectValue: string }>(
  'auth',
  async (_, { rejectWithValue }) => {
    try {
      const authData = await authAPI.me();
      if (authData.resultCode === ResultCodes.success) {
        const { id } = authData.data;
        const profile = await profileAPI.fetchProfile(id);
        const status = await profileAPI.fetchStatus(id);
        return {
          ...authData.data,
          profile,
          status,
        };
      } else if (authData.resultCode === ResultCodes.error) {
        return rejectWithValue(authData.messages[0]);
      }

      return rejectWithValue('Unknown result code');
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const getCaptcha = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>('getCaptcha', async (_, { rejectWithValue }) => {
  try {
    return await authAPI.getCaptchaUrl();
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText ?? 'Unable to fetch captcha'
    );
  }
});

export const signIn = createAsyncThunk<
  void,
  SignInPayload,
  { rejectValue: string }
>('signIn', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const signInData = await authAPI.logIn(payload);

    if (signInData.resultCode === ResultCodes.success) {
      dispatch(auth());
    } else if (signInData.resultCode === CaptchaResultCodes.captchaIsRequired) {
      dispatch(getCaptcha());
      rejectWithValue(signInData.messages[0]);
    } else if (signInData.resultCode === ResultCodes.error) {
      rejectWithValue(signInData.messages[0]);
    } else {
      rejectWithValue('Unknown result code');
    }
  } catch (e) {
    const error = e as AxiosError;
    rejectWithValue(error.response?.statusText ?? 'Unable to sign in');
  }
});

export const signOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'signOut',
  async (_, { rejectWithValue }) => {
    try {
      const signOutData = await authAPI.logOut();
      if (signOutData.resultCode === ResultCodes.success) {
      } else if (signOutData.resultCode === ResultCodes.error) {
        rejectWithValue(signOutData.messages[0]);
      } else {
        rejectWithValue('Unknown result code');
      }
    } catch (e) {
      const error = e as AxiosError;
      rejectWithValue(error.response?.statusText ?? 'Unable to sign out');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signingInErrorChanged: (state, action) => {
      state.signingInError = action.payload;
    },
    signingUpErrorChanged: (state, action) => {
      state.signingUpError = action.payload;
    },

    signingOutErrorChanged: (state, action) => {
      state.signingOutError = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(auth.pending, (state) => {
        state.isAuthorizing = true;
        state.authError = null;
      })
      .addCase(auth.fulfilled, (state, { payload }) => {
        state.isAuthorizing = false;
        state.isAuth = true;

        state.id = payload.id;
        state.email = payload.email;
        state.login = payload.login;
        state.profile = payload.profile;
        state.status = payload.status;
      })
      .addCase(auth.rejected, (state, { payload }) => {
        state.authError = payload || null;
        state.isAuthorizing = false;
        state.isAuth = false;
      })

      .addCase(signIn.pending, (state) => {
        state.isSigningIn = true;
        state.signingInError = null;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isSigningIn = false;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.signingInError = payload ?? null;
        state.isSigningIn = false;
      })

      .addCase(signOut.pending, (state) => {
        state.isSigningOut = true;
        state.signingOutError = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isSigningOut = false;
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        state.signingOutError = payload || null;
        state.isSigningOut = false;
      }),
});

export const {
  signingInErrorChanged,
  signingOutErrorChanged,
  signingUpErrorChanged,
} = authSlice.actions;

export default authSlice.reducer;
