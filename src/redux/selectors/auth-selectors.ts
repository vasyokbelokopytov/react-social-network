import { globalStateType } from '../redux-store';

export const selectUserAuthId = (state: globalStateType) => {
  return state.auth.id;
};

export const selectUserAuthEmail = (state: globalStateType) => {
  return state.auth.email;
};

export const selectUserAuthLogin = (state: globalStateType) => {
  return state.auth.login;
};

export const selectIsAuth = (state: globalStateType) => {
  return state.auth.isAuth;
};

export const selectUserAuthProfile = (state: globalStateType) => {
  return state.auth.profile;
};

export const selectCaptchaUrl = (state: globalStateType) => {
  return state.auth.captchaUrl;
};
