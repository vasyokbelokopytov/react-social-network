import { template, ResponseType, CaptchaResultCodes, ResultCodes } from './api';

type MeDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginDataType = {
  userId: number;
};

export const authAPI = {
  async me() {
    const response = await template.get<ResponseType<MeDataType>>(`auth/me/`);
    return response.data;
  },

  async login(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | string = null
  ) {
    const response = await template.post<
      ResponseType<LoginDataType, ResultCodes | CaptchaResultCodes>
    >('auth/login/', {
      email,
      password,
      rememberMe,
      captcha,
    });
    return response.data;
  },

  async logout() {
    const response = await template.delete<ResponseType>('auth/login/');
    return response.data;
  },
};
