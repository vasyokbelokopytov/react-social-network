import { ActionTypes, ThunkType } from '../types/types';
import { loadUserAuthData } from './auth-reducer';

const SET_INITIALIZED = 'social-network/app/SET_INITIALIZED';
const SET_GLOBAL_ERROR = 'social-network/app/SET_GLOBAL_ERROR';

const initialState = {
  initialized: false as boolean,
  globalError: null as null | Error,
};

type InitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
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

export const actions = {
  setInitialized: () =>
    ({
      type: SET_INITIALIZED,
    } as const),

  setGlobalError: (globalError: null | Error) =>
    ({
      type: SET_GLOBAL_ERROR,
      globalError,
    } as const),
};

export const initialize = (): ThunkType<typeof actions> => async (dispatch) => {
  await Promise.all([dispatch(loadUserAuthData())]);

  dispatch(actions.setInitialized());
};

export default appReducer;
