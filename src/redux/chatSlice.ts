import { v1 } from 'uuid';
import {
  chatAPI,
  MessagesRecievedSubscriberType,
  StatusChangedSubscriberType,
  StatusType,
} from '../api/chat-api';
import { ChatMessageType } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from './store';

export type ChatPendingMessage = ChatMessageType & {
  id: string;
  pending: boolean;
};

export interface ChatState {
  messages: ChatPendingMessage[];
  pendingMessages: ChatPendingMessage[];
  status: StatusType;
  connectingError: string | null;
  isConnecting: boolean;
}

const initialState: ChatState = {
  messages: [],
  pendingMessages: [],
  status: 'pending',
  connectingError: null,
  isConnecting: true,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messagesRecieved: (
      state,
      { payload }: PayloadAction<ChatMessageType[]>
    ) => {
      state.messages = [
        ...state.messages.filter((m) => m.id !== state.pendingMessages[0]?.id),
        ...payload.map((m) => ({ ...m, id: v1(), pending: false })),
      ].filter((_, i, arr) => i >= arr.length - 20);

      state.pendingMessages.unshift();
    },

    messageSended: (state, { payload }: PayloadAction<ChatPendingMessage>) => {
      if (!state.pendingMessages.includes(payload)) {
        state.messages.push(payload);
        state.pendingMessages.push(payload);
      }
    },

    statusChanged: (state, { payload }: PayloadAction<StatusType>) => {
      state.status = payload;
      state.isConnecting = payload === 'pending';

      state.connectingError =
        payload === 'closed' ||
        payload === 'error' ||
        (state.connectingError && payload === 'pending')
          ? state.connectingError ?? 'Unable to connect'
          : null;
    },
  },
});

let messageSubscriber: MessagesRecievedSubscriberType | null = null;

const messageSubscriberCreator = (dispatch: AppDispatch) => {
  messageSubscriber = messageSubscriber
    ? messageSubscriber
    : (messages: Array<ChatMessageType>) => {
        dispatch(messagesRecieved(messages));
      };

  return messageSubscriber;
};

let statusSubscriber: StatusChangedSubscriberType | null = null;

const statusSubscriberCreator = (dispatch: AppDispatch) => {
  statusSubscriber = statusSubscriber
    ? statusSubscriber
    : (status: StatusType) => {
        dispatch(statusChanged(status));
      };
  return statusSubscriber;
};

export const subscribe = (): AppThunk => async (dispatch) => {
  chatAPI.createConnection();
  chatAPI.subscribe('messages-recieved', messageSubscriberCreator(dispatch));
  chatAPI.subscribe('status-changed', statusSubscriberCreator(dispatch));
};

export const unsubscribe = (): AppThunk => async (dispatch) => {
  chatAPI.unsubscribe('messages-recieved', messageSubscriberCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusSubscriberCreator(dispatch));
  dispatch(statusChanged('pending'));
};

export const reconnect = (): AppThunk => async () => {
  chatAPI.createConnection();
};

export const sendPendingMessage =
  (message: ChatPendingMessage): AppThunk =>
  async () => {
    chatAPI.sendMessage(message.message);
  };

export const sendMessage =
  (messageText: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();

    if (state.auth.profile && state.auth.id && state.auth.login) {
      const message: ChatPendingMessage = {
        id: v1(),
        message: messageText,
        photo: state.auth.profile.photos.small,
        userId: state.auth.id,
        userName: state.auth.login,
        pending: true,
      };

      dispatch(messageSended(message));
    }
  };

export const { statusChanged, messageSended, messagesRecieved } =
  chatSlice.actions;

export default chatSlice.reducer;
