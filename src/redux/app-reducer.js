import { loadUserAuthData } from './auth-reducer';

const SET_INITIALIZED = 'social-network/app/SET-INITIALIZED';
const SET_GLOBAL_ERROR = 'social-network/app/SET-GLOBAL-ERROR';

const initialState = {
  initialized: false,
  globalError: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    case SET_GLOBAL_ERROR:
      return {
        ...state,
        globalError: action.globalError,
      };

    default:
      return state;
  }
};

export const setInitialized = () => ({ type: SET_INITIALIZED });

export const setGlobalError = (globalError) => ({
  type: SET_GLOBAL_ERROR,
  globalError,
});

export const initialize = () => async (dispatch) => {
  await Promise.all([dispatch(loadUserAuthData())]);

  dispatch(setInitialized());
};

export default appReducer;
