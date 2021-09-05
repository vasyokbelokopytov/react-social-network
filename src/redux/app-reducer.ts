import { loadUserAuthData } from './auth-reducer';

const SET_INITIALIZED = 'social-network/app/SET-INITIALIZED';
const SET_GLOBAL_ERROR = 'social-network/app/SET-GLOBAL-ERROR';

const initialState = {
  initialized: false as boolean,
  globalError: null as null | any,
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type SetInitializedActionType = {
  type: typeof SET_INITIALIZED;
};

type SetGlobalErrorActionType = {
  type: typeof SET_GLOBAL_ERROR;
  globalError: Error | null;
};

export const setInitialized = (): SetInitializedActionType => ({
  type: SET_INITIALIZED,
});

export const setGlobalError = (
  globalError: null | any
): SetGlobalErrorActionType => ({
  type: SET_GLOBAL_ERROR,
  globalError,
});

export const initialize = () => async (dispatch: any) => {
  await Promise.all([dispatch(loadUserAuthData())]);

  dispatch(setInitialized());
};

export default appReducer;
