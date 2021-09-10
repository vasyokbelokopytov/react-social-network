import { ThunkAction } from 'redux-thunk';
import { loadUserAuthData } from './auth-reducer';
import { GlobalStateType } from './redux-store';

const SET_INITIALIZED = 'social-network/app/SET-INITIALIZED';
const SET_GLOBAL_ERROR = 'social-network/app/SET-GLOBAL-ERROR';

const initialState = {
  initialized: false as boolean,
  globalError: null as null | any,
};

type InitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
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
export const setInitialized = (): SetInitializedActionType => ({
  type: SET_INITIALIZED,
});

export type SetGlobalErrorActionType = {
  type: typeof SET_GLOBAL_ERROR;
  globalError: Error | null;
};
export const setGlobalError = (
  globalError: null | any
): SetGlobalErrorActionType => ({
  type: SET_GLOBAL_ERROR,
  globalError,
});

type ActionsTypes = SetInitializedActionType | SetGlobalErrorActionType;

type ThunkType = ThunkAction<void, GlobalStateType, unknown, ActionsTypes>;

export const initialize = (): ThunkType => async (dispatch) => {
  await Promise.all([dispatch(loadUserAuthData())]);

  dispatch(setInitialized());
};

export default appReducer;
