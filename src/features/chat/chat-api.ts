import { ChatMessage } from '../../app/types';

export type ChatConnectionStatus = 'pending' | 'closed' | 'opened' | 'error';

export type MessagesRecievedSubscriber = (messages: Array<ChatMessage>) => void;

export type StatusChangedSubscriber = (status: ChatConnectionStatus) => void;

type EventSubscribersType = {
  'messages-recieved': MessagesRecievedSubscriber[];
  'status-changed': StatusChangedSubscriber[];
};

type EventType = keyof EventSubscribersType;

let ws: WebSocket | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

const primaryConnectionCheck = () => {
  const localTimer = setTimeout(() => {
    if (timer) {
      chatAPI.createConnection();
      timer = null;
    }

    if (localTimer) clearTimeout(localTimer);
  }, 5000);

  timer = localTimer;
};

let subscribers: EventSubscribersType = {
  'messages-recieved': [],
  'status-changed': [],
};

const openConnectionHandler = () => {
  const interval = setInterval(() => {
    if (ws && ws.readyState === 1) {
      subscribers['status-changed'].forEach((s) => s('opened'));
      clearInterval(interval);
    }
  }, 100);

  console.log('connection opened');
};

const closeConnectionHandler = () => {
  subscribers['status-changed'].forEach((s) => s('closed'));

  console.log('connection closed');
};

const messageHandler = (e: MessageEvent) => {
  if (timer) clearTimeout(timer);
  subscribers['status-changed'].forEach((s) => s('opened'));

  const messages = JSON.parse(e.data);
  subscribers['messages-recieved'].forEach((s) => s(messages));
};

const errorHandler = () => {
  console.log('error');
  subscribers['status-changed'].forEach((s) => s('error'));
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeConnectionHandler);
  ws?.removeEventListener('open', openConnectionHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('error', errorHandler);
  ws?.close();
};

export const chatAPI = {
  createConnection() {
    cleanUp();

    ws = new WebSocket(
      'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    );

    subscribers['status-changed'].forEach((s) => s('pending'));

    ws.addEventListener('open', openConnectionHandler);
    ws.addEventListener('close', closeConnectionHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('error', errorHandler);
  },

  subscribe(
    event: EventType,
    subscriber: EventSubscribersType[EventType][number]
  ) {
    subscribers = {
      ...subscribers,
      [event]: [...subscribers[event], subscriber],
    };
  },

  unsubscribe(
    event: EventType,
    subscriber: EventSubscribersType[EventType][number]
  ) {
    subscribers = {
      ...subscribers,
      [event]: (subscribers[event] as Function[]).filter(
        (s) => s !== subscriber
      ),
    };
  },

  sendMessage(message: string) {
    ws?.send(message);
    primaryConnectionCheck();
  },

  closeConnection() {
    cleanUp();
    ws = null;

    (Object.keys(subscribers) as EventType[]).forEach((key) => {
      subscribers[key] = [];
    });
  },
};
