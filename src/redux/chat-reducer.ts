import { v1 } from 'uuid';
import { Dispatch } from 'redux';
import {
  chatAPI,
  MessagesRecievedSubscriberType,
  StatusType,
} from '../api/chat-api';
import { ActionTypes, ChatMessageType, ThunkType } from '../types/types';

const MESSAGES_RECIEVED = 'chat/MESSAGES_RECIEVED';
const STATUS_CHANGED = 'chat/STATUS_CHANGED';

export type ChatMessageWithIdType = ChatMessageType & { id: string };

const initialState = {
  messages: [] as Array<ChatMessageWithIdType>,
  status: 'pending' as StatusType,
  isConnectingError: false,
  isConnectingFailed: false,
  isConnecting: false,
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
          ...state.messages,
          ...action.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((_, i, arr) => i >= arr.length - 20),
      };

    case STATUS_CHANGED:
      return {
        ...state,
        status: action.status,
        isConnectingFailed: action.status === 'error',
        isConnecting: action.status === 'pending',
        isConnectingError: action.status !== 'opened',
      };

    default:
      return state;
  }
};

export const actions = {
  messagesRecieved: (messages: Array<ChatMessageType>) =>
    ({
      type: MESSAGES_RECIEVED,
      messages,
    } as const),

  statusChanged: (status: StatusType) =>
    ({
      type: STATUS_CHANGED,
      status,
    } as const),
};

const messageSubscriber: MessagesRecievedSubscriberType | null = null;

const messageSubscriberCreator = (dispatch: Dispatch) => {
  return messageSubscriber
    ? messageSubscriber
    : (messages: Array<ChatMessageType>) => {
        dispatch(actions.messagesRecieved(messages));
      };
};

const statusSubscriber: MessagesRecievedSubscriberType | null = null;

const statusSubscriberCreator = (dispatch: Dispatch) => {
  return statusSubscriber
    ? statusSubscriber
    : (status: StatusType) => {
        dispatch(actions.statusChanged(status));
      };
};

export const subscribe = (): ThunkType => async (dispatch) => {
  chatAPI.createConnection();
  chatAPI.subscribe('messages-recieved', messageSubscriberCreator(dispatch));
  chatAPI.subscribe('status-changed', statusSubscriberCreator(dispatch));
};

export const unsubscribe = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-recieved', messageSubscriberCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusSubscriberCreator(dispatch));
};

export const sendMessage =
  (message: string): ThunkType =>
  async () => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;
