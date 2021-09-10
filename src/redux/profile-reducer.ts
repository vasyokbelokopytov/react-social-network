import { getStringDate } from '../utilities/helpers/helpers';
import { profileAPI, ResultCodes } from '../api/api';

import { ProfileType, UserPhotosType, PostType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from './redux-store';

const ADD_POST = 'social-network/profile/ADD-POST';
const DELETE_POST = 'social-network/profile/DELETE-POST';
const SET_USER_PROFILE = 'social-network/profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'social-network/profile/SET-USER-STATUS';
const SET_USER_PHOTOS = 'social-network/profile/SET-USER-PHOTOS';

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
  action: ActionsTypes
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

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS;
  status: string | null;
};
export const setUserStatus = (
  status: string | null
): SetUserStatusActionType => ({
  type: SET_USER_STATUS,
  status,
});

type SetUserPhotoActionType = {
  type: typeof SET_USER_PHOTOS;
  photos: UserPhotosType;
};
export const setUserPhotos = (
  photos: UserPhotosType
): SetUserPhotoActionType => ({
  type: SET_USER_PHOTOS,
  photos,
});

type AddPostActionType = {
  type: typeof ADD_POST;
  postText: string;
};
export const addPost = (postText: string): AddPostActionType => ({
  type: ADD_POST,
  postText,
});

type DeletePostActionType = {
  type: typeof DELETE_POST;
  id: number;
};
export const deletePost = (id: number): DeletePostActionType => ({
  type: DELETE_POST,
  id,
});

type ActionsTypes =
  | SetUserProfileActionType
  | SetUserStatusActionType
  | SetUserPhotoActionType
  | AddPostActionType
  | DeletePostActionType;

type ThunkType = ThunkAction<void, GlobalStateType, unknown, ActionsTypes>;
type FormThunkType = ThunkAction<
  Promise<Array<string> | undefined>,
  GlobalStateType,
  unknown,
  ActionsTypes
>;

export const loadUserProfile =
  (id: number): ThunkType =>
  async (dispatch) => {
    const profile = await profileAPI.loadProfile(id);
    dispatch(setUserProfile(profile));
  };

export const loadUserStatus =
  (id: number): ThunkType =>
  async (dispatch) => {
    const status = await profileAPI.loadStatus(id);
    dispatch(setUserStatus(status));
  };

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.updateStatus(status);

    if (data.resultCode === ResultCodes.success) {
      dispatch(setUserStatus(status));
    }
  };

export const savePhoto =
  (file: any): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);

    if (data.resultCode === ResultCodes.success) {
      dispatch(setUserPhotos(data.data.photos));
    }
  };

export const saveUserProfile =
  (profile: ProfileType): FormThunkType =>
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
