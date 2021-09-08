import { ThunkAction } from 'redux-thunk';
import { authAPI, profileAPI, securityAPI } from '../api/api';
import { ProfileType } from '../types/types';
import { globalStateType } from './redux-store';

const SET_USER_AUTH_DATA = 'social-network/auth/SET-USER-AUTH-DATA';
const SET_USER_AUTH_PROFILE = 'social-network/auth/SET-USER-AUTH-PROFILE';
const SET_CAPTCHA_URL = 'social-network/auth/SET-CAPTCHA-URL';

const initialState = {
  id: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false as boolean,
  profile: null as null | ProfileType,
  captchaUrl: null as null | string,
};

type InitialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_AUTH_DATA:
      return {
        ...state,
        ...action.data,
      };

    case SET_USER_AUTH_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };

    default:
      return state;
  }
};

type SetUserAuthDataActionType = {
  type: typeof SET_USER_AUTH_DATA;
  data: {
    id: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
  };
};
export const setUserAuthData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetUserAuthDataActionType => ({
  type: SET_USER_AUTH_DATA,
  data: { id, email, login, isAuth },
});

type SetCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL;
  captchaUrl: string;
};
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
  type: SET_CAPTCHA_URL,
  captchaUrl,
});

type SetUserAuthProfileActionType = {
  type: typeof SET_USER_AUTH_PROFILE;
  profile: ProfileType | null;
};
export const setUserAuthProfile = (
  profile: ProfileType | null
): SetUserAuthProfileActionType => {
  return {
    type: SET_USER_AUTH_PROFILE,
    profile,
  };
};

type ActionsTypes =
  | SetUserAuthDataActionType
  | SetUserAuthDataActionType
  | SetCaptchaUrlActionType
  | SetUserAuthProfileActionType;

type ThunkType = ThunkAction<void, globalStateType, unknown, ActionsTypes>;
type FormThunkType = ThunkAction<
  Promise<Array<string>> | Promise<undefined>,
  globalStateType,
  unknown,
  ActionsTypes
>;

export const loadUserAuthProfile =
  (id: number | null): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.loadProfile(id);
    dispatch(setUserAuthProfile(data));
  };

export const loadUserAuthData = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me();

  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setUserAuthData(id, email, login, true));
    dispatch(loadUserAuthProfile(id));
  }
};

export const logIn =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ): FormThunkType =>
  async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
      dispatch(loadUserAuthData());
      return;
    } else if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }

    return data.messages;
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const url = data.url;
  dispatch(setCaptchaUrl(url));
};

export const logOut = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();

  if (data.resultCode === 0) {
    dispatch(setUserAuthData(null, null, null, false));
    dispatch(setUserAuthProfile(null));
  }
};

export default authReducer;
