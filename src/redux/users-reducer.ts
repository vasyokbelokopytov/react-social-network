import { ResultCodes } from '../api/api';
import usersAPI from '../api/users-api';
import { actions as appActions } from './app-reducer';

import { ActionTypes, ThunkType, UserType } from '../types/types';

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
    case 'social-network/app/FOLLOW':
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

    case 'social-network/app/UNFOLLOW':
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

    case 'social-network/app/SET_USERS':
      return {
        ...state,
        users: action.users,
      };

    case 'social-network/app/SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case 'social-network/app/SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };

    case 'social-network/app/TOGGLE_LOADER':
      return {
        ...state,
        isFetching: !state.isFetching,
      };

    case 'social-network/app/SET_FOLLOWING':
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
      type: 'social-network/app/FOLLOW',
      userId,
    } as const),

  unfollow: (userId: number) =>
    ({
      type: 'social-network/app/UNFOLLOW',
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: 'social-network/app/SET_USERS',
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'social-network/app/SET_CURRENT_PAGE',
      currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'social-network/app/SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),

  toggleLoader: () =>
    ({
      type: 'social-network/app/TOGGLE_LOADER',
    } as const),

  setFollowing: (isFollowing: boolean, id: number) =>
    ({
      type: 'social-network/app/SET_FOLLOWING',
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
