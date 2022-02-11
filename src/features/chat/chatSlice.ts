import { v1 } from 'uuid';
import {
  chatAPI,
  MessagesRecievedSubscriber,
  StatusChangedSubscriber,
  ChatConnectionStatus,
} from './chat-api';
import { ChatMessage, WithUuid } from '../../app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '../../app/store';

export interface ChatState {
  messages: (ChatMessage & WithUuid)[];
  status: ChatConnectionStatus;
  connectingError: string | null;
  isConnecting: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  status: 'pending',
  connectingError: null,
  isConnecting: true,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messagesRecieved: (state, { payload }: PayloadAction<ChatMessage[]>) => {
      state.messages.push(...payload.map((m) => ({ ...m, id: v1() })));
    },

    statusChanged: (
      state,
      { payload }: PayloadAction<ChatConnectionStatus>
    ) => {
      state.status = payload;
      state.isConnecting = payload === 'pending';

      state.connectingError =
        payload === 'closed' ||
        payload === 'error' ||
        (state.connectingError && payload === 'pending')
          ? state.connectingError ?? 'Unable to connect'
          : null;
    },

    errorChanged: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
  },
});

let messageSubscriber: MessagesRecievedSubscriber | null = null;

const messageSubscriberCreator = (dispatch: AppDispatch) => {
  messageSubscriber = messageSubscriber
    ? messageSubscriber
    : (messages: Array<ChatMessage>) => {
        dispatch(messagesRecieved(messages));
      };

  return messageSubscriber;
};

let statusSubscriber: StatusChangedSubscriber | null = null;

const statusSubscriberCreator = (dispatch: AppDispatch) => {
  statusSubscriber = statusSubscriber
    ? statusSubscriber
    : (status: ChatConnectionStatus) => {
        dispatch(statusChanged(status));
      };
  return statusSubscriber;
};

export const subscribe = (): AppThunk => async (dispatch) => {
  chatAPI.subscribe('messages-recieved', messageSubscriberCreator(dispatch));
  chatAPI.subscribe('status-changed', statusSubscriberCreator(dispatch));
  chatAPI.createConnection();
};

export const unsubscribe = (): AppThunk => async (dispatch) => {
  chatAPI.unsubscribe('messages-recieved', messageSubscriberCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusSubscriberCreator(dispatch));
  dispatch(statusChanged('pending'));
};

export const reconnect = (): AppThunk => async () => {
  chatAPI.createConnection();
};

export const sendMessage = (message: string) => {
  chatAPI.sendMessage(message);
};

export const { statusChanged, messagesRecieved, errorChanged } =
  chatSlice.actions;

export default chatSlice.reducer;
