import { ResponseType, ResultCodes } from '../api/api';
import usersAPI from '../api/users-api';
import { UserType } from '../types/types';
import usersReducer, {
  InitialState,
  actions,
  followUser,
  unfollowUser,
} from './users-reducer';

let state: InitialState;

const dispatch = jest.fn();
const getState = jest.fn();

jest.mock('../api/users-api');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: ResponseType = {
  data: {},
  fieldsErrors: [],
  messages: [],
  resultCode: ResultCodes.success,
};

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        followed: false,
        name: 'Me',
        photos: {
          large: null,
          small: null,
        },
        status: '',
      },
      {
        id: 1,
        followed: false,
        name: 'v',
        photos: {
          large: null,
          small: null,
        },
        status: '',
      },
      {
        id: 2,
        followed: true,
        name: 'b',
        photos: {
          large: null,
          small: null,
        },
        status: '',
      },
    ] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followedUsers: [] as Array<number>, // Array of users' IDs
  };

  dispatch.mockClear();
  getState.mockClear();
  usersAPIMock.follow.mockClear();
  usersAPIMock.unfollow.mockClear();
});

test('follow success', () => {
  const newState = usersReducer(state, actions.follow(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () => {
  const newState = usersReducer(state, actions.follow(2));

  expect(newState.users[1].followed).toBeFalsy();
  expect(newState.users[2].followed).toBeTruthy();
});

test('success follow thunk', async () => {
  usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
  const thunk = followUser(1);
  const dispatch = jest.fn();
  const getState = jest.fn();

  await thunk(dispatch, getState, {});

  expect(dispatch).toBeCalledTimes(3);
  expect(dispatch).toHaveBeenNthCalledWith(1, actions.setFollowing(true, 1));
  expect(dispatch).toHaveBeenNthCalledWith(2, actions.follow(1));
  expect(dispatch).toHaveBeenNthCalledWith(3, actions.setFollowing(false, 1));
});

test('success unfollow thunk', async () => {
  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
  const thunk = unfollowUser(2);

  await thunk(dispatch, getState, {});

  expect(dispatch).toBeCalledTimes(3);
  expect(dispatch).toHaveBeenNthCalledWith(1, actions.setFollowing(true, 2));
  expect(dispatch).toHaveBeenNthCalledWith(2, actions.unfollow(2));
  expect(dispatch).toHaveBeenNthCalledWith(3, actions.setFollowing(false, 2));
});
