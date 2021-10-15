import { GlobalStateType } from '../redux-store';

export const selectIsAppInitialized = (state: GlobalStateType) => {
  return state.app.isAppInitialized;
};

export const selectIsInitializing = (state: GlobalStateType) => {
  return state.app.isInitializing;
};

export const selectUnhandledError = (state: GlobalStateType) => {
  return state.app.unhandledError;
};

export const selectInitializingError = (state: GlobalStateType) => {
  return state.app.initializingError;
};
