import { ThunkAction } from 'redux-thunk';
import {
  authAPI,
  CaptchaResultCodes,
  profileAPI,
  ResultCodes,
  securityAPI,
} from '../api/api';
import { ActionTypes, ProfileType } from '../types/types';
import { GlobalStateType } from './redux-store';

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
  action: ActionTypes<typeof actions>
): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_AUTH_DATA':
      return {
        ...state,
        ...action.data,
      };

    case 'SET_USER_AUTH_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };

    case 'SET_CAPTCHA_URL':
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };

    default:
      return state;
  }
};

export const actions = {
  setUserAuthData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'SET_USER_AUTH_DATA',
      data: { id, email, login, isAuth },
    } as const),

  setCaptchaUrl: (captchaUrl: string) =>
    ({
      type: 'SET_CAPTCHA_URL',
      captchaUrl,
    } as const),

  setUserAuthProfile: (profile: ProfileType | null) => {
    return {
      type: 'SET_USER_AUTH_PROFILE',
      profile,
    } as const;
  },
};

type ThunkType = ThunkAction<
  void,
  GlobalStateType,
  unknown,
  ActionTypes<typeof actions>
>;

export type FormThunkType = ThunkAction<
  Promise<Array<string> | undefined>,
  GlobalStateType,
  unknown,
  ActionTypes<typeof actions>
>;

export const loadUserAuthProfile =
  (id: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.loadProfile(id);
    dispatch(actions.setUserAuthProfile(data));
  };

export const loadUserAuthData = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me();

  if (data.resultCode === ResultCodes.success) {
    const { id, email, login } = data.data;
    dispatch(actions.setUserAuthData(id, email, login, true));
    dispatch(loadUserAuthProfile(id));
  }
};

export const logIn =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ): FormThunkType =>
  async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodes.success) {
      dispatch(loadUserAuthData());
      return;
    } else if (data.resultCode === CaptchaResultCodes.captchaIsRequired) {
      dispatch(getCaptchaUrl());
    }

    return data.messages;
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const url = data.url;
  dispatch(actions.setCaptchaUrl(url));
};

export const logOut = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();

  if (data.resultCode === ResultCodes.success) {
    dispatch(actions.setUserAuthData(null, null, null, false));
    dispatch(actions.setUserAuthProfile(null));
  }
};

export default authReducer;
