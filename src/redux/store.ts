import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import messagesReducer from './messagesSlice';
import profileReducer from './profileSlice';
import usersReducer from './usersSlice';
import authReducer from './authSlice';
import appReducer from './appSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    profile: profileReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
