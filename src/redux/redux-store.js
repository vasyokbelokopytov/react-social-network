import { combineReducers, createStore } from 'redux';

import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';

const reducers = combineReducers({
  messagesPage: messagesReducer,
  profilePage: profileReducer,
});

const store = createStore(reducers);

export default store;
