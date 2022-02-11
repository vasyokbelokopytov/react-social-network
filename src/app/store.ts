import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import profileReducer from '../features/profile/profileSlice';
import usersReducer from '../features/users/usersSlice';
import authReducer from '../features/auth/authSlice';
import appReducer from '../features/app/appSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
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
