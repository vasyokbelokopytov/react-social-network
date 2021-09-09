import axios from 'axios';
import { ProfileType, UserPhotosType, UserType } from '../types/types';

const template = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a4fa4ef1-f845-4321-a530-4f875beff57f',
  },
});

export enum ResultCodes {
  success = 0,
  error = 1,
}

export enum CaptchaResultCodes {
  captchaIsRequired = 10,
}

type UsersLoadUsersType = {
  items: Array<UserType>;
  error: null | string;
  totalCount: number;
};

type UsersFollowType = {
  data: {};
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: number;
};

export const usersAPI = {
  async loadUsers(currentPage: number, pageSize: number) {
    const response = await template.get<UsersLoadUsersType>(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },

  async follow(id: number) {
    const response = await template.post<UsersFollowType>(`follow/${id}`, {});
    return response.data;
  },

  async unfollow(id: number) {
    const response = await template.delete<UsersFollowType>(`follow/${id}`);
    return response.data;
  },
};

type ProfileUpdateProfile = {
  data: {};
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: number;
};

type ProfileLoadStatus = null | string;

type ProfileUpdateStatus = {
  data: {};
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: number;
};

type ProfileSavePhoto = {
  data: {
    photos: UserPhotosType;
  };
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: number;
};

export const profileAPI = {
  async loadProfile(id: number) {
    const response = await template.get<ProfileType>(`profile/${id}`);
    return response.data;
  },

  async updateProfile(profile: ProfileType) {
    const response = await template.put<ProfileUpdateProfile>(
      `profile`,
      profile
    );
    return response.data;
  },

  async loadStatus(id: number) {
    const response = await template.get<ProfileLoadStatus>(
      `profile/status/${id}`
    );
    return response.data;
  },

  async updateStatus(status: string) {
    const response = await template.put<ProfileUpdateStatus>(
      `profile/status/`,
      { status }
    );
    return response.data;
  },

  async savePhoto(file: any) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await template.put<ProfileSavePhoto>(
      `profile/photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },
};

type AuthMeType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodes;
  messages: Array<string>;
  fieldsErrors: Array<string>;
};

type AuthLoginType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodes | CaptchaResultCodes;
  messages: Array<string>;
  fieldsErrors: Array<string>;
};

type AuthLogoutType = {
  data: {};
  resultCode: ResultCodes;
  messages: Array<string>;
  fieldsErrors: Array<string>;
};

export const authAPI = {
  async me() {
    const response = await template.get<AuthMeType>(`auth/me/`);
    return response.data;
  },

  async login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    const response = await template.post<AuthLoginType>('auth/login/', {
      email,
      password,
      rememberMe,
      captcha,
    });
    return response.data;
  },

  async logout() {
    const response = await template.delete<AuthLogoutType>('auth/login/');
    return response.data;
  },
};

type SecurityGetCaptchaUrlType = {
  url: string;
};

export const securityAPI = {
  async getCaptchaUrl() {
    const response = await template.get<SecurityGetCaptchaUrlType>(
      `/security/get-captcha-url`
    );
    return response.data;
  },
};
