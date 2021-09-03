export const selectUserAuthId = (state) => {
  return state.auth.id;
};

export const selectUserAuthEmail = (state) => {
  return state.auth.email;
};

export const selectUserAuthLogin = (state) => {
  return state.auth.login;
};

export const selectIsAuth = (state) => {
  return state.auth.isAuth;
};

export const selectUserAuthProfile = (state) => {
  return state.auth.profile;
};

export const selectCaptchaUrl = (state) => {
  return state.auth.captchaUrl;
};
