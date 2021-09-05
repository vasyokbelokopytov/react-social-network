import { getStringDate } from '../utilities/helpers/helpers';
import { profileAPI } from '../api/api';

import { ProfileType, UserPhotosType, PostType } from '../types/types';

const ADD_POST = 'social-network/profile/ADD-POST';
const DELETE_POST = 'social-network/profile/DELETE-POST';
const SET_USER_PROFILE = 'social-network/profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'social-network/profile/SET-USER-STATUS';
const SET_USER_PHOTOS = 'social-network/profile/SET-USER-PHOTOS';

const initialState = {
  profile: null as null | ProfileType,
  status: '',
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
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        name: 'Vasiliy Belokopytov',
        date: getStringDate(),
        text: action.post,
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
  status: string;
};
export const setUserStatus = (status: string): SetUserStatusActionType => ({
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
  post: PostType;
};
export const addPost = (post: PostType): AddPostActionType => ({
  type: ADD_POST,
  post,
});

type DeletePostActionType = {
  type: typeof DELETE_POST;
  id: number;
};
export const deletePost = (id: number): DeletePostActionType => ({
  type: DELETE_POST,
  id,
});

export const loadUserProfile = (id: number) => async (dispatch: any) => {
  const profile = await profileAPI.loadProfile(id);
  dispatch(setUserProfile(profile));
};

export const loadUserStatus = (id: number) => async (dispatch: any) => {
  const status = await profileAPI.loadStatus(id);
  dispatch(setUserStatus(status));
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
  const data = await profileAPI.updateStatus(status);

  if (data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  const data = await profileAPI.savePhoto(file);

  if (data.resultCode === 0) {
    dispatch(setUserPhotos(data.data.photos));
  }
};

export const saveUserProfile =
  (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const id = getState().auth.id;
    const data = await profileAPI.updateProfile(profile);
    if (data.resultCode === 0) {
      dispatch(loadUserProfile(id));
      return;
    }

    return data.messages;
  };

export default profileReducer;
