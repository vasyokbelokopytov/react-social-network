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
        isAuth: true,
      };

    default:
      return state;
  }
};

export const setUserAuthData = (data) => ({ type: SET_USER_AUTH_DATA, data });

export const getUserAuthData = () => {
  return (dispatch) => {
    authAPI.me().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserAuthData(data.data));
      }
    });
  };
};

export default authReducer;
