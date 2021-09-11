import { template, ResponseType, ResponseItemsType } from './api';
import { UserType } from '../types/types';

const usersAPI = {
  async loadUsers(currentPage: number, pageSize: number) {
    const response = await template.get<ResponseItemsType<UserType>>(
      `users?page=${currentPage}&count=${pageSize}`
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
