import { ThunkAction } from 'redux-thunk';
import { ActionTypes } from '../types/types';
import { loadUserAuthData } from './auth-reducer';
import { GlobalStateType } from './redux-store';

const initialState = {
  initialized: false as boolean,
  globalError: null as null | any,
};

type InitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
): InitialStateType => {
  switch (action.type) {
    case 'SET_INITIALIZED':
      return {
        ...state,
        initialized: true,
      };

    case 'SET_GLOBAL_ERROR':
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
      type: 'SET_INITIALIZED',
    } as const),

  setGlobalError: (globalError: null | any) =>
    ({
      type: 'SET_GLOBAL_ERROR',
      globalError,
    } as const),
};

type ThunkType = ThunkAction<
  void,
  GlobalStateType,
  unknown,
  ActionTypes<typeof actions>
>;

export const initialize = (): ThunkType => async (dispatch) => {
  await Promise.all([dispatch(loadUserAuthData())]);

  dispatch(actions.setInitialized());
};

export default appReducer;
