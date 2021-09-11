import { template } from './api';

type GetCaptchaUrlType = {
  url: string;
};

export const securityAPI = {
  async getCaptchaUrl() {
    const response = await template.get<GetCaptchaUrlType>(
      `/security/get-captcha-url`
    );
    return response.data;
  },
};
