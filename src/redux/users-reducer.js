const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_LOADER = 'TOGGLE-LOADER';

const initialState = {
  // users: [
  //   {
  //     id: 1,
  //     name: 'Vasily',
  //     photoURL:
  //       'https://i.pinimg.com/originals/bb/36/69/bb3669015ea166c1df4a1b308754f171.jpg',
  //     location: {
  //       country: 'Ukraine',
  //       city: 'Kyiv',
  //     },
  //     status: 'hi',
  //     followed: false,
  //   },
  //   {
  //     id: 2,
  //     name: 'Vasily',
  //     photoURL:
  //       'https://i.pinimg.com/originals/bb/36/69/bb3669015ea166c1df4a1b308754f171.jpg',
  //     location: {
  //       country: 'Russia',
  //       city: 'Moscow',
  //     },
  //     status: 'hi',
  //     followed: false,
  //   },
  //   {
  //     id: 3,
  //     name: 'Gena',
  //     photoURL:
  //       'https://i.pinimg.com/originals/bb/36/69/bb3669015ea166c1df4a1b308754f171.jpg',
  //     location: {
  //       country: 'Italy',
  //       city: 'Milan',
  //     },
  //     status: 'Enough',
  //     followed: true,
  //   },
  // ],
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
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

    default:
      return state;
  }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });

export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });

export const setUsersAC = (users) => ({ type: SET_USERS, users });

export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setTotalUsersCountAC = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

export const toggleLoaderAC = () => ({ type: TOGGLE_LOADER });

export default usersReducer;
