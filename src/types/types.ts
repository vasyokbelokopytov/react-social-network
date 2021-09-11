export type ActionTypes<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<
    T extends { [key: string]: infer ActionCreator } ? ActionCreator : never
  >;

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
  lookingForAJobDescription: string;
  fullName: string;
  contacts: UserContactsType;
  photos: UserPhotosType;
};
