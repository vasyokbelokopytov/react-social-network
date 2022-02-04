export interface AuthData {
  id: null | number;
  email: null | string;
  login: null | string;
  profile: null | ProfileType;
  status: null | string;
}

export interface SignInPayload {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

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

export type ProfileFormDataType = Omit<ProfileType, 'userId' | 'photos'>;

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
