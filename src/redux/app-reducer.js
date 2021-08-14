import { loadUserAuthData } from './auth-reducer';

const SET_INITIALIZED = 'social-network/app/SET-INITIALIZED';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const setInitialized = () => ({ type: SET_INITIALIZED });

export const initialize = () => async (dispatch) => {
  await Promise.all([dispatch(loadUserAuthData())]);

  dispatch(setInitialized());
};

export default appReducer;
