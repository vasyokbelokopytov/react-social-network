import { GlobalStateType } from '../redux-store';

export const selectInitialized = (state: GlobalStateType) => {
  return state.app.initialized;
};

export const selectGlobalError = (state: GlobalStateType) => {
  return state.app.globalError;
};
