import { GlobalStateType } from '../redux-store';

export const selectIsInitialized = (state: GlobalStateType) => {
  return state.app.isInitialized;
};

export const selectGlobalError = (state: GlobalStateType) => {
  return state.app.globalError;
};
