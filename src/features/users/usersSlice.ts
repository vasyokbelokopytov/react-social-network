import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ResponseItems, ResultCodes } from '../../app/api';
import usersAPI from './users-api';

import { User, Filter, FetchUsersPayload } from '../../app/types';

export interface UserState {
  users: User[];
  pageSize: number;
  pageSizeOptions: number[];
  totalUsersCount: number;
  currentPage: number;
  fetchingError: string | null;
  isFetching: boolean;

  filter: Filter;

  followingError: string | null;
  usersInFollowingProcess: number[]; // Array of users' IDs
}

const initialState: UserState = {
  users: [],
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  totalUsersCount: 0,
  currentPage: 1,
  fetchingError: null,
  isFetching: false,

  filter: {
    term: '',
    friend: null,
  },

  followingError: null,
  usersInFollowingProcess: [],
};

export const fetchUsers = createAsyncThunk<
  ResponseItems<User>,
  FetchUsersPayload,
  { rejectValue: string }
>('fetchUsers', async (payload, { rejectWithValue }) => {
  try {
    return await usersAPI.fetchUsers(payload);
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to fetch users'
    );
  }
});

export const followUser = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>('followUser', async (id, { rejectWithValue }) => {
  try {
    const data = await usersAPI.follow(id);
    if (data.resultCode === ResultCodes.success) {
    } else if (data.resultCode === ResultCodes.error) {
      return rejectWithValue(data.messages[0]);
    } else {
      return rejectWithValue('Unknown result code');
    }
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to follow user'
    );
  }
});

export const unfollowUser = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>('unfollowUser', async (id, { rejectWithValue }) => {
  try {
    const data = await usersAPI.unfollow(id);
    if (data.resultCode === ResultCodes.success) {
    } else if (data.resultCode === ResultCodes.error) {
      return rejectWithValue(data.messages[0]);
    } else {
      return rejectWithValue('Unknown result code');
    }
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(
      error.response?.statusText || 'Unable to unfollow user'
    );
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    currentPageChanged: (state, { payload }) => {
      state.currentPage = payload;
    },
    pageSizeChanged: (state, { payload }) => {
      state.pageSize = payload;
    },
    filterChanged: (state, { payload }) => {
      state.filter = payload;
    },

    errorsCleared: (state) => {
      state.fetchingError = null;
      state.followingError = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.users = payload.items;
        state.totalUsersCount = payload.totalCount;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.fetchingError = payload || null;
      })

      .addCase(followUser.pending, (state, { meta }) => {
        state.usersInFollowingProcess.push(meta.arg);
        state.followingError = null;
      })
      .addCase(followUser.fulfilled, (state, { meta }) => {
        state.usersInFollowingProcess = state.usersInFollowingProcess.filter(
          (id) => id !== meta.arg
        );
        state.users = state.users.map((u) => {
          return u.id !== meta.arg ? u : { ...u, followed: true };
        });
      })
      .addCase(followUser.rejected, (state, { payload, meta }) => {
        state.usersInFollowingProcess = state.usersInFollowingProcess.filter(
          (id) => id !== meta.arg
        );
        state.followingError = payload || null;
      })

      .addCase(unfollowUser.pending, (state, { meta }) => {
        state.usersInFollowingProcess.push(meta.arg);
        state.followingError = null;
      })
      .addCase(unfollowUser.fulfilled, (state, { meta }) => {
        state.usersInFollowingProcess = state.usersInFollowingProcess.filter(
          (id) => id !== meta.arg
        );
        state.users = state.users.map((u) => {
          return u.id !== meta.arg ? u : { ...u, followed: false };
        });
      })
      .addCase(unfollowUser.rejected, (state, { payload, meta }) => {
        state.usersInFollowingProcess = state.usersInFollowingProcess.filter(
          (id) => id !== meta.arg
        );
        state.followingError = payload || null;
      }),
});

export const {
  currentPageChanged,
  filterChanged,
  pageSizeChanged,
  errorsCleared,
} = usersSlice.actions;

export default usersSlice.reducer;
