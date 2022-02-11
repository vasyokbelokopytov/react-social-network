export interface AuthData {
  id: null | number;
  email: null | string;
  login: null | string;
  profile: null | Profile;
  status: null | string;
}

export interface SignInPayload {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

export interface FetchUsersPayload {
  page: number;
  pageSize: number;
  filter: Filter;
}

export interface UserPhotos {
  small: string | null;
  large: string | null;
}

export type UserStatus = string | null;
export type FollowingStatus = boolean;

export interface User {
  id: number;
  name: string;
  status: UserStatus;
  photos: UserPhotos;
  followed: FollowingStatus;
}

export interface UserContacts {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
}

export interface Profile {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string;
  contacts: UserContacts;
  photos: UserPhotos;
  aboutMe: string | null;
}

export type ProfileFormData = Omit<Profile, 'userId' | 'photos'>;

export interface Filter {
  term: string;
  friend: null | boolean;
}

export interface WithUuid {
  id: string;
}

export interface ChatMessage {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
}
