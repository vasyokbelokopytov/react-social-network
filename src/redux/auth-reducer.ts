import { CaptchaResultCodes, ResultCodes } from '../api/api';
import { authAPI } from '../api/auth-api';
import { profileAPI } from '../api/profile-api';
import { securityAPI } from '../api/security-api';

import { ActionTypes, ProfileType, ThunkType } from '../types/types';

const AUTH_DATA_CHANGED = 'auth/AUTH_DATA_CHANGED';

const AUTH_ATTEMPT = 'auth/AUTH_ATTEMPT';
const AUTH_SUCCEED = 'auth/AUTH_SUCCEED';
const AUTH_FAILED = 'auth/AUTH_FAILED';

const LOG_IN_ATTEMPT = 'auth/LOG_IN_ATTEMPT';
const LOG_IN_SUCCEED = 'auth/LOG_IN_SUCCEED';
const LOG_IN_FAILED = 'auth/LOG_IN_FAILED';
const LOGGING_IN_ERROR_CHANGED = 'auth/LOGGING_IN_ERROR_CHANGED';

const LOG_OUT_ATTEMPT = 'auth/LOG_OUT_ATTEMPT';
const LOG_OUT_SUCCEED = 'auth/LOG_OUT_SUCCEED';
const LOG_OUT_FAILED = 'auth/LOG_OUT_FAILED';

const CAPTCHA_URL_CHANGED = 'auth/CAPTCHA_URL_CHANGED';

const initialState = {
  id: null as null | number,
  email: null as null | string,
  login: null as null | string,
  profile: null as null | ProfileType,
  status: null as null | string,
  isAuth: false as boolean,
  isAuthProcessing: false,
  authError: null as null | Error,

  isLoggingInProcessing: false,
  loggingInError: null as null | Error,

  isLoggingOutProcessing: false,
  loggingOutError: null as null | Error,

  captchaUrl: null as null | string,
};

type InitialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
): InitialStateType => {
  switch (action.type) {
    case AUTH_DATA_CHANGED:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        login: action.payload.login,
        isAuth: action.payload.isAuth,
        profile: action.payload.profile,
        status: action.payload.status,
      };

    case AUTH_ATTEMPT:
      return {
        ...state,
        isAuthProcessing: true,
      };

    case AUTH_SUCCEED:
      return {
        ...state,
        isAuthProcessing: false,
        authError: null,
      };

    case AUTH_FAILED:
      return {
        ...state,
        isAuthProcessing: false,
        authError: action.error,
      };

    case LOG_IN_ATTEMPT:
      return {
        ...state,
        isLoggingInProcessing: true,
      };

    case LOG_IN_SUCCEED:
      return {
        ...state,
        isLoggingInProcessing: false,
        loggingInError: null,
      };

    case LOG_IN_FAILED:
      return {
        ...state,
        isLoggingInProcessing: false,
        loggingInError: action.error,
      };

    case LOGGING_IN_ERROR_CHANGED:
      return {
        ...state,
        loggingInError: action.error,
      };

    case LOG_OUT_ATTEMPT:
      return {
        ...state,
        isLoggingOutProcessing: true,
      };

    case LOG_OUT_SUCCEED:
      return {
        ...state,
        isLoggingOutProcessing: false,
        loggingOutError: null,
      };

    case LOG_OUT_FAILED:
      return {
        ...state,
        isLoggingOutProcessing: false,
        loggingOutError: action.error,
      };

    case CAPTCHA_URL_CHANGED:
      return {
        ...state,
        captchaUrl: action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  authDataChanged: (
    id: number | null,
    email: string | null,
    login: string | null,
    profile: ProfileType | null,
    status: null | string,
    isAuth: boolean
  ) => {
    return {
      type: AUTH_DATA_CHANGED,
      payload: { id, email, login, isAuth, profile, status },
    } as const;
  },

  authAttempt: () => {
    return {
      type: AUTH_ATTEMPT,
    } as const;
  },

  authSucceed: () => {
    return {
      type: AUTH_SUCCEED,
    } as const;
  },

  authFailed: (error: Error) => {
    return {
      type: AUTH_FAILED,
      error,
    } as const;
  },

  logInAttempt: () => {
    return {
      type: LOG_IN_ATTEMPT,
    } as const;
  },

  logInSucceed: () => {
    return {
      type: LOG_IN_SUCCEED,
    } as const;
  },

  logInFailed: (error: Error) => {
    return {
      type: LOG_IN_FAILED,
      error,
    } as const;
  },

  loggingInErrorChanged: (error: Error | null) =>
    ({
      type: LOGGING_IN_ERROR_CHANGED,
      error,
    } as const),

  logOutAttempt: () => {
    return {
      type: LOG_OUT_ATTEMPT,
    } as const;
  },

  logOutSucceed: () => {
    return {
      type: LOG_OUT_SUCCEED,
    } as const;
  },

  logOutFailed: (error: Error) => {
    return {
      type: LOG_OUT_FAILED,
      error,
    } as const;
  },

  captchaUrlChanged: (captchaUrl: string | null) => {
    return {
      type: CAPTCHA_URL_CHANGED,
      payload: captchaUrl,
    } as const;
  },
};

export const auth = (): ThunkType => async (dispatch) => {
  dispatch(actions.authAttempt());

  try {
    const data = await authAPI.me();
    if (data.resultCode === ResultCodes.success) {
      const { id, email, login } = data.data;
      const profile = await profileAPI.fetchProfile(id);
      const status = await profileAPI.fetchStatus(id);
      dispatch(
        actions.authDataChanged(id, email, login, profile, status, true)
      );
    } else if (data.resultCode === ResultCodes.error) {
      dispatch(actions.authFailed(new Error(data.messages[0])));
    }
  } catch (e) {
    dispatch(actions.authFailed(e as Error));
  }
};

export const logIn =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
  ): ThunkType =>
  async (dispatch) => {
    dispatch(actions.logInAttempt());

    try {
      const data = await authAPI.login(email, password, rememberMe, captcha);

      if (data.resultCode === ResultCodes.success) {
        dispatch(auth());
        dispatch(actions.logInSucceed());
      } else if (data.resultCode === CaptchaResultCodes.captchaIsRequired) {
        const { url } = await securityAPI.getCaptchaUrl();
        dispatch(actions.captchaUrlChanged(url));
        dispatch(actions.logInFailed(new Error(data.messages[0])));
      } else if (data.resultCode === ResultCodes.error) {
        dispatch(actions.logInFailed(new Error(data.messages[0])));
      }
    } catch (e) {
      dispatch(actions.logInFailed(e as Error));
    }
  };

export const logOut = (): ThunkType => async (dispatch) => {
  dispatch(actions.logOutAttempt());

  try {
    const data = await authAPI.logout();
    if (data.resultCode === ResultCodes.success) {
      dispatch(actions.authDataChanged(null, null, null, null, null, false));
      dispatch(actions.captchaUrlChanged(null));
    } else if (data.resultCode === ResultCodes.error) {
      dispatch(actions.logOutFailed(new Error(data.messages[0])));
    }
  } catch (e) {
    dispatch(actions.logOutFailed(e as Error));
  }
};

export default authReducer;
