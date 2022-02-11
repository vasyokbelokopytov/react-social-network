import { template, Response, ResponseItems } from '../../app/api';
import { User, FetchUsersPayload } from '../../app/types';

const usersAPI = {
  async fetchUsers({ filter, page, pageSize }: FetchUsersPayload) {
    const { term, friend } = filter;
    const response = await template.get<ResponseItems<User>>(
      `users?page=${page}&count=${pageSize}${term ? `&term=${term}` : ''}${
        friend !== null ? `&friend=${friend}` : ''
      }
      `
    );
    return response.data;
  },

  async follow(id: number) {
    const response = await template.post<Response>(`follow/${id}`, {});
    return response.data;
  },

  async unfollow(id: number) {
    const response = await template.delete<Response>(`follow/${id}`);
    return response.data;
  },
};

export default usersAPI;
