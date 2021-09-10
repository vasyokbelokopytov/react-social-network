import { GlobalStateType } from '../redux-store';

export const selectUserAuthId = (state: GlobalStateType) => {
  return state.auth.id;
};

export const selectUserAuthEmail = (state: GlobalStateType) => {
  return state.auth.email;
};

export const selectUserAuthLogin = (state: GlobalStateType) => {
  return state.auth.login;
};

export const selectIsAuth = (state: GlobalStateType) => {
  return state.auth.isAuth;
};

export const selectUserAuthProfile = (state: GlobalStateType) => {
  return state.auth.profile;
};

export const selectCaptchaUrl = (state: GlobalStateType) => {
  return state.auth.captchaUrl;
};
