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

export const selectUserAuthProfile = (state: GlobalStateType) => {
  return state.auth.profile;
};

export const selectUserAuthStatus = (state: GlobalStateType) => {
  return state.auth.status;
};

export const selectIsAuth = (state: GlobalStateType) => {
  return state.auth.isAuth;
};

export const selectIsAuthProcessing = (state: GlobalStateType) => {
  return state.auth.isAuthProcessing;
};

export const selectAuthError = (state: GlobalStateType) => {
  return state.auth.authError;
};

export const selectIsLoggingInProcessing = (state: GlobalStateType) => {
  return state.auth.isLoggingInProcessing;
};

export const selectLoggingInError = (state: GlobalStateType) => {
  return state.auth.loggingInError;
};

export const selectIsLoggingOutProcessing = (state: GlobalStateType) => {
  return state.auth.isLoggingOutProcessing;
};

export const selectLoggingOutError = (state: GlobalStateType) => {
  return state.auth.loggingOutError;
};

export const selectCaptchaUrl = (state: GlobalStateType) => {
  return state.auth.captchaUrl;
};
