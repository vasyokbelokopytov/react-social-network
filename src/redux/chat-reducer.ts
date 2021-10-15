import { v1 } from 'uuid';
import { Dispatch } from 'redux';
import {
  chatAPI,
  MessagesRecievedSubscriberType,
  StatusChangedSubscriberType,
  StatusType,
} from '../api/chat-api';
import { ActionTypes, ChatMessageType, ThunkType } from '../types/types';

const MESSAGES_RECIEVED = 'chat/MESSAGES_RECIEVED';
const MESSAGE_SENDED = 'chat/MESSAGE_SENDED';
const STATUS_CHANGED = 'chat/STATUS_CHANGED';

export type ChatPendingMessage = ChatMessageType & {
  id: string;
  pending: boolean;
};

const initialState = {
  messages: [] as Array<ChatPendingMessage>,
  pendingMessages: [] as Array<ChatPendingMessage>,
  status: 'pending' as StatusType,
  connectingError: null as Error | null,
  isConnecting: true,
};

type InitialStateType = typeof initialState;

const chatReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
): InitialStateType => {
  switch (action.type) {
    case MESSAGES_RECIEVED:
      return {
        ...state,

        messages: [
          ...state.messages.filter(
            (m) => m.id !== state.pendingMessages[0]?.id
          ),
          ...action.payload.map((m) => ({ ...m, id: v1(), pending: false })),
        ].filter((_, i, arr) => i >= arr.length - 20),

        pendingMessages: state.pendingMessages.slice(1),
      };

    case MESSAGE_SENDED:
      return {
        ...state,
        messages: state.pendingMessages.includes(action.payload)
          ? state.messages
          : [...state.messages, action.payload],
        pendingMessages: state.pendingMessages.includes(action.payload)
          ? state.pendingMessages
          : [...state.pendingMessages, action.payload],
      };

    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload,
        isConnecting: action.payload === 'pending',
        connectingError:
          action.payload === 'closed' ||
          action.payload === 'error' ||
          (state.connectingError && action.payload === 'pending')
            ? state.connectingError ?? new Error('Unable to connect')
            : null,
      };

    default:
      return state;
  }
};

export const actions = {
  messageSended: (message: ChatPendingMessage) =>
    ({
      type: MESSAGE_SENDED,
      payload: message,
    } as const),

  messagesRecieved: (messages: Array<ChatMessageType>) =>
    ({
      type: MESSAGES_RECIEVED,
      payload: messages,
    } as const),

  statusChanged: (status: StatusType) =>
    ({
      type: STATUS_CHANGED,
      payload: status,
    } as const),
};

let messageSubscriber: MessagesRecievedSubscriberType | null = null;

const messageSubscriberCreator = (dispatch: Dispatch) => {
  messageSubscriber = messageSubscriber
    ? messageSubscriber
    : (messages: Array<ChatMessageType>) => {
        dispatch(actions.messagesRecieved(messages));
      };

  return messageSubscriber;
};

let statusSubscriber: StatusChangedSubscriberType | null = null;

const statusSubscriberCreator = (dispatch: Dispatch) => {
  statusSubscriber = statusSubscriber
    ? statusSubscriber
    : (status: StatusType) => {
        dispatch(actions.statusChanged(status));
      };
  return statusSubscriber;
};

export const subscribe = (): ThunkType => async (dispatch) => {
  chatAPI.createConnection();
  chatAPI.subscribe('messages-recieved', messageSubscriberCreator(dispatch));
  chatAPI.subscribe('status-changed', statusSubscriberCreator(dispatch));
};

export const unsubscribe = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-recieved', messageSubscriberCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusSubscriberCreator(dispatch));
  dispatch(actions.statusChanged('pending'));
};

export const reconnect = (): ThunkType => async () => {
  chatAPI.createConnection();
};

export const sendPendingMessage =
  (message: ChatPendingMessage): ThunkType =>
  async () => {
    chatAPI.sendMessage(message.message);
  };

export const sendMessage =
  (messageText: string): ThunkType =>
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

      dispatch(actions.messageSended(message));
    }
  };

export default chatReducer;
