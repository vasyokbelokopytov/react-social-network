import { usersAPI } from '../api/api';
import { setGlobalError } from './app-reducer';

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET-USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET-TOTAL-USERS-COUNT';
const TOGGLE_LOADER = 'social-network/users/TOGGLE-LOADER';
const SET_FOLLOWING = 'social-network/users/TOGGLE-FOLLOWING';

const initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowing: [],
};

const usersReducer = (state = initialState, action) => {
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

export const follow = (userId) => ({ type: FOLLOW, userId });

export const unfollow = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (users) => ({ type: SET_USERS, users });

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

export const toggleLoader = () => ({ type: TOGGLE_LOADER });

export const setFollowing = (isFollowing, id) => ({
  type: SET_FOLLOWING,
  isFollowing,
  id,
});

export const loadUsers =
  (page = 1, pageSize = 10) =>
  async (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(toggleLoader());

    const users = await usersAPI.loadUsers(page, pageSize);
    dispatch(toggleLoader());
    dispatch(setUsers(users.items));
    dispatch(setTotalUsersCount(users.totalCount));
  };

export const followUser = (id) => async (dispatch) => {
  dispatch(setFollowing(true, id));

  try {
    const data = await usersAPI.follow(id);

    if (data.resultCode === 0) {
      dispatch(follow(id));
    }
  } catch (e) {
    console.log(e);
    dispatch(setGlobalError(e));
  }

  dispatch(setFollowing(false, id));
};

export const unfollowUser = (id) => async (dispatch) => {
  dispatch(setFollowing(true, id));

  try {
    const data = await usersAPI.unfollow(id);
    if (data.resultCode === 0) {
      dispatch(unfollow(id));
    }
  } catch (e) {
    dispatch(setGlobalError(e));
  }

  dispatch(setFollowing(false, id));
};

export default usersReducer;
