import { GlobalStateType } from '../redux-store';

export const selectMessages = (state: GlobalStateType) => {
  return state.chat.messages;
};

export const selectStatus = (state: GlobalStateType) => {
  return state.chat.status;
};

export const selectIsConnectingFailed = (state: GlobalStateType) => {
  return state.chat.isConnectingFailed;
};

export const selectIsConnectingError = (state: GlobalStateType) => {
  return state.chat.isConnectingError;
};

export const selectIsConnecting = (state: GlobalStateType) => {
  return state.chat.isConnecting;
};

export const selectPendingMessages = (state: GlobalStateType) => {
  return state.chat.pendingMessages;
};
