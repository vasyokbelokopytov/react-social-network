import axios from 'axios';

export const template = axios.create({
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

export type ResponseItemsType<T> = {
  items: Array<T>;
  totalCount: number;
  error: string | null;
};

export type ResponseType<D = {}, RC = ResultCodes> = {
  data: D;
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: RC;
};
