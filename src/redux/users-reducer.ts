import { ResultCodes } from '../api/api';
import usersAPI from '../api/users-api';
import { actions as appActions } from './app-reducer';

import { ActionTypes, ThunkType, UserType } from '../types/types';

const FOLLOW = 'social-network/app/FOLLOW';
const UNFOLLOW = 'social-network/app/UNFOLLOW';
const SET_USERS = 'social-network/app/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/app/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/app/SET_TOTAL_USERS_COUNT';
const TOGGLE_LOADER = 'social-network/app/TOGGLE_LOADER';
const SET_FOLLOWING = 'social-network/app/SET_FOLLOWING';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followedUsers: [] as Array<number>, // Array of users' IDs
};

export type InitialState = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
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
        followedUsers: action.isFollowing
          ? [...state.followedUsers, action.id]
          : state.followedUsers.filter((id) => id !== action.id),
      };

    default:
      return state;
  }
};

export const actions = {
  follow: (userId: number) =>
    ({
      type: FOLLOW,
      userId,
    } as const),

  unfollow: (userId: number) =>
    ({
      type: UNFOLLOW,
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: SET_USERS,
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: SET_CURRENT_PAGE,
      currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: SET_TOTAL_USERS_COUNT,
      totalUsersCount,
    } as const),

  toggleLoader: () =>
    ({
      type: TOGGLE_LOADER,
    } as const),

  setFollowing: (isFollowing: boolean, id: number) =>
    ({
      type: SET_FOLLOWING,
      isFollowing,
      id,
    } as const),

  setGlobalError: appActions.setGlobalError,
};

export const loadUsers =
  (page: number, pageSize: number): ThunkType<typeof actions> =>
  async (dispatch) => {
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.toggleLoader());

    const users = await usersAPI.loadUsers(page, pageSize);
    dispatch(actions.toggleLoader());
    dispatch(actions.setUsers(users.items));
    dispatch(actions.setTotalUsersCount(users.totalCount));
  };

export const followUser =
  (id: number): ThunkType<typeof actions> =>
  async (dispatch) => {
    dispatch(actions.setFollowing(true, id));

    try {
      const data = await usersAPI.follow(id);

      if (data.resultCode === ResultCodes.success) {
        dispatch(actions.follow(id));
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch(appActions.setGlobalError(e));
      }
    }

    dispatch(actions.setFollowing(false, id));
  };

export const unfollowUser =
  (id: number): ThunkType<typeof actions> =>
  async (dispatch) => {
    dispatch(actions.setFollowing(true, id));

    try {
      const data = await usersAPI.unfollow(id);
      if (data.resultCode === ResultCodes.success) {
        dispatch(actions.unfollow(id));
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch(appActions.setGlobalError(e));
      }
    }

    dispatch(actions.setFollowing(false, id));
  };

export default usersReducer;
