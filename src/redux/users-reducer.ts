import { ResultCodes, usersAPI } from '../api/api';
import { setGlobalError, SetGlobalErrorActionType } from './app-reducer';

import { UserType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from './redux-store';

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET-USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET-TOTAL-USERS-COUNT';
const TOGGLE_LOADER = 'social-network/users/TOGGLE-LOADER';
const SET_FOLLOWING = 'social-network/users/TOGGLE-FOLLOWING';

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
  action: ActionsTypes
): InitialState => {
  switch (action.type) {
    case FOLLOW:
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

    case UNFOLLOW:
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

    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };

    case TOGGLE_LOADER:
      return {
        ...state,
        isFetching: !state.isFetching,
      };

    case SET_FOLLOWING:
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

type ActionsTypes =
  | FollowActionType
  | UnfollowActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalUsersCountActionType
  | ToggleLoaderActionType
  | SetFollowingActionType
  | SetGlobalErrorActionType;

type FollowActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export const follow = (userId: number): FollowActionType => ({
  type: FOLLOW,
  userId,
});

type UnfollowActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollow = (userId: number): UnfollowActionType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (
  currentPage: number
): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};
export const setTotalUsersCount = (
  totalUsersCount: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

type ToggleLoaderActionType = {
  type: typeof TOGGLE_LOADER;
};
export const toggleLoader = (): ToggleLoaderActionType => ({
  type: TOGGLE_LOADER,
});

type SetFollowingActionType = {
  type: typeof SET_FOLLOWING;
  isFollowing: boolean;
  id: number;
};
export const setFollowing = (
  isFollowing: boolean,
  id: number
): SetFollowingActionType => ({
  type: SET_FOLLOWING,
  isFollowing,
  id,
});

type ThunkType = ThunkAction<
  Promise<void>,
  GlobalStateType,
  unknown,
  ActionsTypes
>;

export const loadUsers =
  (page: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(toggleLoader());

    const users = await usersAPI.loadUsers(page, pageSize);
    dispatch(toggleLoader());
    dispatch(setUsers(users.items));
    dispatch(setTotalUsersCount(users.totalCount));
  };

export const followUser =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(setFollowing(true, id));

    try {
      const data = await usersAPI.follow(id);

      if (data.resultCode === ResultCodes.success) {
        dispatch(follow(id));
      }
    } catch (e) {
      dispatch(setGlobalError(e));
    }

    dispatch(setFollowing(false, id));
  };

export const unfollowUser =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(setFollowing(true, id));

    try {
      const data = await usersAPI.unfollow(id);
      if (data.resultCode === ResultCodes.success) {
        dispatch(unfollow(id));
      }
    } catch (e) {
      dispatch(setGlobalError(e));
    }

    dispatch(setFollowing(false, id));
  };

export default usersReducer;
