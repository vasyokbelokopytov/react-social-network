import { ResultCodes } from '../api/api';
import usersAPI from '../api/users-api';

import { ActionTypes, ThunkType, UserType, FilterType } from '../types/types';

const USER_SUBSCRIBING_REQUEST = 'users/USER_SUBSCRIBING_REQUEST';
const USER_SUBSCRIBING_SUCCEED = 'users/USER_SUBSCRIBING_SUCCEED';
const USER_SUBSCRIBING_FAILED = 'users/USER_SUBSCRIBING_FAILED';
const USERS_IN_FOLLOWING_PROCESS_CHANGED =
  'users/USERS_IN_FOLLOWING_PROCESS_CHANGED';

const USERS_FETCH_REQUESTED = 'users/USERS_FETCH_REQUESTED';
const USERS_FETCH_SUCCEED = 'users/USERS_FETCH_SUCCEED';
const USERS_FETCH_FAILED = 'users/USERS_FETCH_FAILED';
const IS_FETCHING_CHANGED = 'users/IS_FETCHING_CHANGED';
const TOTAL_USERS_COUNT_CHANGED = 'users/TOTAL_USERS_COUNT_CHANGED';

const CURRENT_PAGE_CHANGED = 'users/CURRENT_PAGE_CHANGED';
const PAGE_SIZE_CHANGED = 'users/PAGE_SIZE_CHANGED';

const FILTER_CHANGED = 'users/FILTER_CHANGED';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  totalUsersCount: 0,
  currentPage: 1,
  fetchingError: null as null | Error,
  isFetching: false,

  filter: {
    term: '',
    friend: null as null | boolean,
  },

  followingError: null as null | Error,
  usersInFollowingProcess: [] as Array<number>, // Array of users' IDs
};

export type InitialState = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
): InitialState => {
  switch (action.type) {
    case USER_SUBSCRIBING_REQUEST:
      return {
        ...state,
        usersInFollowingProcess: [
          ...state.usersInFollowingProcess,
          action.payload,
        ],
        followingError: null,
      };

    case USER_SUBSCRIBING_SUCCEED:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.userId) {
            return {
              ...user,
              followed: action.payload.type === 'follow' ? true : false,
            };
          }

          return user;
        }),

        usersInFollowingProcess: state.usersInFollowingProcess.filter(
          (id) => id !== action.payload.userId
        ),
        followingError: null,
      };

    case USER_SUBSCRIBING_FAILED:
      return {
        ...state,

        usersInFollowingProcess: state.usersInFollowingProcess.filter(
          (id) => id !== action.payload
        ),
        followingError: action.error,
      };

    case USERS_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true,
        fetchingError: null,
      };

    case USERS_FETCH_SUCCEED:
      return {
        ...state,
        users: action.payload,
        isFetching: false,
        fetchingError: null,
      };

    case USERS_FETCH_FAILED:
      return {
        ...state,
        fetchingError: action.error,
      };

    case CURRENT_PAGE_CHANGED:
      return {
        ...state,
        currentPage: action.payload,
      };

    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        pageSize: action.payload,
      };

    case TOTAL_USERS_COUNT_CHANGED:
      return {
        ...state,
        totalUsersCount: action.payload,
      };

    case FILTER_CHANGED:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  userSubscribingRequest: (userId: number) =>
    ({
      type: USER_SUBSCRIBING_REQUEST,
      payload: userId,
    } as const),

  userSubscribingSucceed: (userId: number, type: 'follow' | 'unfollow') =>
    ({
      type: USER_SUBSCRIBING_SUCCEED,
      payload: { userId, type },
    } as const),

  userSubscribingFailed: (userId: number, error: Error) =>
    ({
      type: USER_SUBSCRIBING_FAILED,
      payload: userId,
      error: error,
    } as const),

  usersFetchRequested: () =>
    ({
      type: USERS_FETCH_REQUESTED,
    } as const),

  usersFetchSucceed: (users: Array<UserType>) =>
    ({
      type: USERS_FETCH_SUCCEED,
      payload: users,
    } as const),

  usersFetchFailed: (error: Error) =>
    ({
      type: USERS_FETCH_FAILED,
      error: error,
    } as const),

  currentPageChanged: (currentPage: number) =>
    ({
      type: CURRENT_PAGE_CHANGED,
      payload: currentPage,
    } as const),

  pageSizeChanged: (size: number) =>
    ({
      type: PAGE_SIZE_CHANGED,
      payload: size,
    } as const),

  filterChanged: (filter: FilterType) =>
    ({
      type: FILTER_CHANGED,
      payload: filter,
    } as const),

  totalUsersCountChanged: (totalUsersCount: number) =>
    ({
      type: TOTAL_USERS_COUNT_CHANGED,
      payload: totalUsersCount,
    } as const),

  isFetchingChanged: (isFetching: boolean) =>
    ({
      type: IS_FETCHING_CHANGED,
      payload: isFetching,
    } as const),

  usersInFollowingProcessChanged: (isProcessing: boolean, id: number) =>
    ({
      type: USERS_IN_FOLLOWING_PROCESS_CHANGED,
      payload: {
        isProcessing,
        id,
      },
    } as const),
};

export const fetchUsers =
  (
    page: number,
    pageSize: number,
    filter: FilterType
  ): ThunkType<typeof actions> =>
  async (dispatch) => {
    dispatch(actions.usersFetchRequested());

    try {
      const users = await usersAPI.fetchUsers(page, pageSize, filter);
      dispatch(actions.usersFetchSucceed(users.items));
      dispatch(actions.totalUsersCountChanged(users.totalCount));
    } catch (e) {
      dispatch(actions.usersFetchFailed(e as Error));
    }
  };

export const followUser =
  (id: number): ThunkType<typeof actions> =>
  async (dispatch) => {
    dispatch(actions.userSubscribingRequest(id));

    try {
      const data = await usersAPI.follow(id);

      if (data.resultCode === ResultCodes.success) {
        dispatch(actions.userSubscribingSucceed(id, 'follow'));
      }
    } catch (e) {
      dispatch(actions.userSubscribingFailed(id, e as Error));
    }
  };

export const unfollowUser =
  (id: number): ThunkType<typeof actions> =>
  async (dispatch) => {
    dispatch(actions.userSubscribingRequest(id));

    try {
      const data = await usersAPI.unfollow(id);

      if (data.resultCode === ResultCodes.success) {
        dispatch(actions.userSubscribingSucceed(id, 'unfollow'));
      }
    } catch (e) {
      dispatch(actions.userSubscribingFailed(id, e as Error));
    }
  };

export default usersReducer;
