import { ActionTypes, ThunkType } from '../types/types';
import { auth } from './auth-reducer';

const INITIALIZING_ATTEMPT = 'app/INITIALIZE_ATTEMPT';
const INITIALIZING_SUCCEED = 'app/INITIALIZING_SUCCEED';
const INITIALIZING_FAILED = 'app/INITIALIZING_FAILED';

const UNHANDLED_ERROR_CHANGED = 'app/UNHANDLED_ERROR_CHANGED';

const initialState = {
  isAppInitialized: false as boolean,
  isInitializing: false,
  initializingError: null as null | Error,
  unhandledError: null as null | Error,
};

type InitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
): InitialStateType => {
  switch (action.type) {
    case INITIALIZING_ATTEMPT:
      return {
        ...state,
        isInitializing: true,
      };

    case INITIALIZING_SUCCEED:
      return {
        ...state,
        isInitializing: false,
        isAppInitialized: true,
        initializingError: null,
      };

    case INITIALIZING_FAILED:
      return {
        ...state,
        isInitializing: false,
        isAppInitialized: false,
        initializingError: action.error,
      };

    case UNHANDLED_ERROR_CHANGED:
      return {
        ...state,
        unhandledError: action.error,
      };

    default:
      return state;
  }
};

export const actions = {
  initializingAttempt: () =>
    ({
      type: INITIALIZING_ATTEMPT,
    } as const),

  initializingSucceed: () =>
    ({
      type: INITIALIZING_SUCCEED,
    } as const),
  initializingFailed: (error: Error) =>
    ({
      type: INITIALIZING_FAILED,
      error,
    } as const),

  unhandledErrorChanged: (error: null | Error) =>
    ({
      type: UNHANDLED_ERROR_CHANGED,
      error,
    } as const),
};

export const initializeApp = (): ThunkType => async (dispatch) => {
  dispatch(actions.initializingAttempt());
  try {
    await Promise.all([dispatch(auth())]);
    dispatch(actions.initializingSucceed());
  } catch (e) {
    dispatch(actions.initializingFailed(e as Error));
  }
};

export default appReducer;
