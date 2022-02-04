import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ResponseItemsType, ResultCodes } from '../api/api';
import usersAPI from '../api/users-api';

import { UserType, FilterType } from '../types/types';

export interface UserState {
  users: UserType[];
  pageSize: number;
  pageSizeOptions: number[];
  totalUsersCount: number;
  currentPage: number;
  fetchingError: string | null;
  isFetching: boolean;

  filter: FilterType;

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
  ResponseItemsType<UserType>,
  {
    page: number;
    pageSize: number;
    filter: FilterType;
  },
  { rejectValue: string }
>('fetchUsers', async ({ filter, page, pageSize }, { rejectWithValue }) => {
  try {
    return await usersAPI.fetchUsers(page, pageSize, filter);
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
      rejectWithValue(data.messages[0]);
    } else {
      rejectWithValue('Unknown result code');
    }
  } catch (e) {
    const error = e as AxiosError;
    rejectWithValue(error.response?.statusText || 'Unable to follow user');
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
      rejectWithValue(data.messages[0]);
    } else {
      rejectWithValue('Unknown result code');
    }
  } catch (e) {
    const error = e as AxiosError;
    rejectWithValue(error.response?.statusText || 'Unable to unfollow user');
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

    fetchingErrorChanged: (state, { payload }) => {
      state.fetchingError = payload;
    },

    followingErrorChanged: (state, { payload }) => {
      state.followingError = payload;
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
  followingErrorChanged,
  fetchingErrorChanged,
} = usersSlice.actions;

export default usersSlice.reducer;
