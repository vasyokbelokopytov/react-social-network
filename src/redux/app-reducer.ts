import { ActionTypes, ThunkType } from '../types/types';
import { loadUserAuthData } from './auth-reducer';

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
    case 'social-network/app/SET_INITIALIZED':
      return {
        ...state,
        initialized: true,
      };

    case 'social-network/app/SET_GLOBAL_ERROR':
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
      type: 'social-network/app/SET_INITIALIZED',
    } as const),

  setGlobalError: (globalError: null | Error) =>
    ({
      type: 'social-network/app/SET_GLOBAL_ERROR',
      globalError,
    } as const),
};

export const initialize = (): ThunkType<typeof actions> => async (dispatch) => {
  await Promise.all([dispatch(loadUserAuthData())]);

  dispatch(actions.setInitialized());
};

export default appReducer;
