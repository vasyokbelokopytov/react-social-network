import { SignInPayload } from '../../app/types';
import { template, Response } from '../../app/api';

interface MeData {
  id: number;
  email: string;
  login: string;
}

interface LogInData {
  userId: number;
}

interface CaptchaResponse {
  url: string;
}

export const authAPI = {
  async me() {
    const response = await template.get<Response<MeData>>(`auth/me/`);
    return response.data;
  },

  async logIn(payload: SignInPayload) {
    const response = await template.post<Response<LogInData>>(
      'auth/login/',
      payload
    );
    return response.data;
  },

  async logOut() {
    const response = await template.delete<Response>('auth/login/');
    return response.data;
  },

  async getCaptchaUrl() {
    const response = await template.get<CaptchaResponse>(
      `/security/get-captcha-url`
    );
    return response.data.url;
  },
};
