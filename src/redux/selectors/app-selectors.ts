import { globalStateType } from '../redux-store';

export const selectInitialized = (state: globalStateType) => {
  return state.app.initialized;
};

export const selectGlobalError = (state: globalStateType) => {
  return state.app.globalError;
};
