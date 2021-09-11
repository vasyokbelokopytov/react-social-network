import { ResultCodes } from '../api/api';
import usersAPI from '../api/users-api';
import { actions as appActions } from './app-reducer';

import { ActionTypes, UserType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from './redux-store';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowing: [] as Array<number>, // Array of users' IDs
};

type InitialState = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
): InitialState => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: true,
            };
          }

          return user;
        }),
      };

    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: false,
            };
          }

          return user;
        }),
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };

    case 'TOGGLE_LOADER':
      return {
        ...state,
        isFetching: !state.isFetching,
      };

    case 'SET_FOLLOWING':
      return {
        ...state,
        isFollowing: action.isFollowing
          ? [...state.isFollowing, action.id]
          : state.isFollowing.filter((id) => id !== action.id),
      };

    default:
      return state;
  }
};

export const actions = {
  follow: (userId: number) =>
    ({
      type: 'FOLLOW',
      userId,
    } as const),

  unfollow: (userId: number) =>
    ({
      type: 'UNFOLLOW',
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),

  toggleLoader: () =>
    ({
      type: 'TOGGLE_LOADER',
    } as const),

  setFollowing: (isFollowing: boolean, id: number) =>
    ({
      type: 'SET_FOLLOWING',
      isFollowing,
      id,
    } as const),

  setGlobalError: appActions.setGlobalError,
};

type ThunkType = ThunkAction<
  Promise<void>,
  GlobalStateType,
  unknown,
  ActionTypes<typeof actions>
>;

export const loadUsers =
  (page: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.toggleLoader());

    const users = await usersAPI.loadUsers(page, pageSize);
    dispatch(actions.toggleLoader());
    dispatch(actions.setUsers(users.items));
    dispatch(actions.setTotalUsersCount(users.totalCount));
  };

export const followUser =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setFollowing(true, id));

    try {
      const data = await usersAPI.follow(id);

      if (data.resultCode === ResultCodes.success) {
        dispatch(actions.follow(id));
      }
    } catch (e) {
      dispatch(appActions.setGlobalError(e));
    }

    dispatch(actions.setFollowing(false, id));
  };

export const unfollowUser =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setFollowing(true, id));

    try {
      const data = await usersAPI.unfollow(id);
      if (data.resultCode === ResultCodes.success) {
        dispatch(actions.unfollow(id));
      }
    } catch (e) {
      dispatch(appActions.setGlobalError(e));
    }

    dispatch(actions.setFollowing(false, id));
  };

export default usersReducer;
