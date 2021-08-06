import { authAPI } from '../api/api';

const SET_USER_AUTH_DATA = 'SET-USER-DATA';

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH_DATA:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export const setUserAuthData = (id, email, login, isAuth) => ({
  type: SET_USER_AUTH_DATA,
  data: { id, email, login, isAuth },
});

export const getUserAuthData = () => {
  return (dispatch) => {
    authAPI.me().then((data) => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setUserAuthData(id, email, login, true));
      }
    });
  };
};

export const logIn = (email, password, rememberMe) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      authAPI.login(email, password, rememberMe).then((data) => {
        if (data.resultCode === 0) {
          res();
          dispatch(getUserAuthData());
        } else {
          res(data.messages);
        }
      });
    });
  };
};

export const logOut = () => {
  return (dispatch) => {
    authAPI.logout().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
      }
    });
  };
};

export default authReducer;
