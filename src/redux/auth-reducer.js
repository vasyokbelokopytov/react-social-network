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
      console.log('data', action.data);
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
        console.log(data);
        const { id, email, login } = data.data;
        dispatch(setUserAuthData(id, email, login, true));
      }
    });
  };
};

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe).then((data) => {
      console.log(data);
      if (data.resultCode === 0) {
        dispatch(getUserAuthData());
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    authAPI.logout().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
      }
    });
  };
};

export default authReducer;
