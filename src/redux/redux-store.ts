import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import chatReducer from './chat-reducer';

const rootReducer = combineReducers({
  messagesPage: messagesReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
});

type RootReducerType = typeof rootReducer;
export type GlobalStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
