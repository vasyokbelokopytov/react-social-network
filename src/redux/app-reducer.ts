import { ActionTypes, ThunkType } from '../types/types';
import { auth } from './auth-reducer';

const IS_INITIALIZED_CHANGED = 'app/IS_INITIALIZED_CHANGED';
const GLOBAL_ERROR_CHANGED = 'app/GLOBAL_ERROR_CHANGED';

const initialState = {
  isInitialized: false as boolean,
  globalError: null as null | Error,
};

type InitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
): InitialStateType => {
  switch (action.type) {
    case IS_INITIALIZED_CHANGED:
      return {
        ...state,
        isInitialized: action.payload,
      };

    case GLOBAL_ERROR_CHANGED:
      return {
        ...state,
        globalError: action.error,
      };

    default:
      return state;
  }
};

export const actions = {
  isInitializedChanged: (isInitialized: boolean) =>
    ({
      type: IS_INITIALIZED_CHANGED,
      payload: isInitialized,
    } as const),

  globalErrorChanged: (error: null | Error) =>
    ({
      type: GLOBAL_ERROR_CHANGED,
      error,
    } as const),
};

export const initialize = (): ThunkType => async (dispatch) => {
  try {
    await Promise.all([dispatch(auth())]);
    dispatch(actions.isInitializedChanged(true));
  } catch (e) {
    dispatch(actions.globalErrorChanged(e as Error));
  }
};

export default appReducer;
