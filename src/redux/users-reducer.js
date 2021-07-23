import { usersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_LOADER = 'TOGGLE-LOADER';
const SET_FOLLOWING = 'TOGGLE-FOLLOWING';

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

export const getUsers = (currentPage = 1, pageSize = 10) => {
  return (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleLoader());

    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleLoader());
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };
};

export const followUser = (id) => {
  return (dispatch) => {
    dispatch(setFollowing(true, id));

    usersAPI.follow(id).then((data) => {
      if (data.resultCode === 0) {
        dispatch(follow(id));
        dispatch(setFollowing(false, id));
      }
    });
  };
};

export const unfollowUser = (id) => {
  return (dispatch) => {
    dispatch(setFollowing(true, id));

    usersAPI.unfollow(id).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unfollow(id));
        dispatch(setFollowing(false, id));
      }
    });
  };
};

export default usersReducer;
