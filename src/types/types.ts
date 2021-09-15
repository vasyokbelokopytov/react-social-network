import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from '../redux/redux-store';

type ActionCreatorsType = {
  [key: string]: (...args: any[]) => Action;
};

export type ActionTypes<T extends ActionCreatorsType> = ReturnType<
  T extends { [key: string]: infer ActionCreator } ? ActionCreator : never
>;

export type ThunkType<A extends ActionCreatorsType, R = void> = ThunkAction<
  R,
  GlobalStateType,
  unknown,
  ActionTypes<A>
>;

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
