export const selectInitialized = (state) => {
  return state.app.initialized;
};

export const selectGlobalError = (state) => {
  return state.app.globalError;
};
