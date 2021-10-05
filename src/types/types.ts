import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { GlobalStateType } from '../redux/redux-store';

type ActionCreatorsType = {
  [key: string]: ActionCreator<Action>;
};

export type ActionTypes<T extends ActionCreatorsType> = ReturnType<
  T extends { [key: string]: infer AC } ? AC : never
>;

export type ThunkType<R = void> = ThunkAction<
  R,
  GlobalStateType,
  unknown,
  Action
>;

export type ThunkDispatchType = ThunkDispatch<GlobalStateType, unknown, Action>;

export type FormReturnType = Promise<Array<string> | undefined>;

export type UserPhotosType = {
  small: string | null;
  large: string | null;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: UserPhotosType;
  followed: boolean;
};

export type PostType = {
  id: number;
  name: string;
  date: string;
  text: string;
};

export type UserContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string;
  contacts: UserContactsType;
  photos: UserPhotosType;
  aboutMe: string | null;
};

export type FilterType = {
  term: string;
  friend: null | boolean;
};

export type ChatMessageType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};

// Rename

export type MessageType = {
  id: number;
  sender: 'foreign' | 'self';
  date: string;
  text: string;
};

export type ContactType = {
  id: number;
  img: string;
  name: string;
  date: string;
  text: string;
};
