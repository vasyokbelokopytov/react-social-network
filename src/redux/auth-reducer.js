import { authAPI, profileAPI, securityAPI } from '../api/api';

const SET_USER_AUTH_DATA = 'social-network/auth/SET-USER-AUTH-DATA';
const SET_USER_AUTH_PROFILE = 'social-network/auth/SET-USER-AUTH-PROFILE';
const SET_CAPTCHA_URL = 'social-network/auth/SET-CAPTCHA-URL';

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  profile: null,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
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

export const setUserAuthProfile = (profile) => ({
  type: SET_USER_AUTH_PROFILE,
  profile,
});

export const setUserAuthData = (id, email, login, isAuth) => ({
  type: SET_USER_AUTH_DATA,
  data: { id, email, login, isAuth },
});

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  captchaUrl,
});

export const loadUserAuthData = () => async (dispatch) => {
  const data = await authAPI.me();

  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setUserAuthData(id, email, login, true));
    const profile = await profileAPI.loadProfile(id);
    dispatch(setUserAuthProfile(profile));
  }
};

export const logIn =
  (email, password, rememberMe, captcha) => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    console.log(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
      dispatch(loadUserAuthData());
      return;
    } else if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }

    return data.messages;
  };

export const getCaptchaUrl = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const url = data.url;
  dispatch(setCaptchaUrl(url));
};

export const logOut = () => async (dispatch) => {
  const data = await authAPI.logout();

  if (data.resultCode === 0) {
    dispatch(setUserAuthData(null, null, null, false));
  }
};

export default authReducer;
