import { template, ResponseType, ResponseItemsType } from './api';
import { UserType, FilterType } from '../types/types';

const usersAPI = {
  async fetchUsers(currentPage: number, pageSize: number, filter: FilterType) {
    const { term, friend } = filter;
    const response = await template.get<ResponseItemsType<UserType>>(
      `users?page=${currentPage}&count=${pageSize}${
        term ? `&term=${term}` : ''
      }${friend !== null ? `&friend=${friend}` : ''}
      `
    );
    return response.data;
  },

  async follow(id: number) {
    const response = await template.post<ResponseType>(`follow/${id}`, {});
    return response.data;
  },

  async unfollow(id: number) {
    const response = await template.delete<ResponseType>(`follow/${id}`);
    return response.data;
  },
};

export default usersAPI;
