import { getStringDate } from '../utilities/helpers/helpers';
import { ResultCodes } from '../api/api';

import {
  ProfileType,
  UserPhotosType,
  PostType,
  ActionTypes,
  ThunkType,
  FormReturnType,
} from '../types/types';

import { profileAPI } from '../api/profile-api';

const ADD_POST = 'social-network/app/ADD_POST';
const DELETE_POST = 'social-network/app/DELETE_POST';
const SET_USER_PROFILE = 'social-network/app/SET_USER_PROFILE';
const SET_USER_STATUS = 'social-network/app/SET_USER_STATUS';
const SET_USER_PHOTOS = 'social-network/app/SET_USER_PHOTOS';

const initialState = {
  profile: null as null | ProfileType,
  status: null as null | string,
  posts: [
    {
      id: 1,
      name: 'Vasiliy Belokopytov',
      date: '20:10 PM · 16.04.20',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
    },
    {
      id: 2,
      name: 'Vasiliy Belokopytov',
      date: '20:10 PM · 16.04.20',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
    },
    {
      id: 3,
      name: 'Vasiliy Belokopytov',
      date: '20:10 PM · 16.04.20',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
    },
    {
      id: 4,
      name: 'Vasiliy Belokopytov',
      date: '20:10 PM · 16.04.20',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse.',
    },
  ] as Array<PostType>,
};

type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionTypes<typeof actions>
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        name: 'Vasiliy Belokopytov',
        date: getStringDate(),
        text: action.postText,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case SET_USER_PHOTOS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

export const actions = {
  setUserProfile: (profile: ProfileType) =>
    ({
      type: SET_USER_PROFILE,
      profile,
    } as const),

  setUserStatus: (status: string | null) =>
    ({
      type: SET_USER_STATUS,
      status,
    } as const),

  setUserPhotos: (photos: UserPhotosType) =>
    ({
      type: SET_USER_PHOTOS,
      photos,
    } as const),

  addPost: (postText: string) =>
    ({
      type: ADD_POST,
      postText,
    } as const),

  deletePost: (id: number) =>
    ({
      type: DELETE_POST,
      id,
    } as const),
};

export const loadUserProfile =
  (id: number): ThunkType<typeof actions> =>
  async (dispatch) => {
    const profile = await profileAPI.loadProfile(id);
    dispatch(actions.setUserProfile(profile));
  };

export const loadUserStatus =
  (id: number): ThunkType<typeof actions> =>
  async (dispatch) => {
    const status = await profileAPI.loadStatus(id);
    dispatch(actions.setUserStatus(status));
  };

export const updateUserStatus =
  (status: string): ThunkType<typeof actions> =>
  async (dispatch) => {
    const data = await profileAPI.updateStatus(status);

    if (data.resultCode === ResultCodes.success) {
      dispatch(actions.setUserStatus(status));
    }
  };

export const savePhoto =
  (file: File): ThunkType<typeof actions> =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);

    if (data.resultCode === ResultCodes.success) {
      dispatch(actions.setUserPhotos(data.data.photos));
    }
  };

export const saveUserProfile =
  (profile: ProfileType): ThunkType<typeof actions, FormReturnType> =>
  async (dispatch, getState) => {
    const id = getState().auth.id;

    const data = await profileAPI.updateProfile(profile);

    if (data.resultCode === ResultCodes.success && id !== null) {
      dispatch(loadUserProfile(id));
      return;
    }

    return data.messages;
  };

export default profileReducer;
