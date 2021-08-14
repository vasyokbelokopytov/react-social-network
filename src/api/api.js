import * as axios from 'axios';

const template = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a4fa4ef1-f845-4321-a530-4f875beff57f',
  },
});

export const usersAPI = {
  async loadUsers(currentPage, pageSize) {
    const response = await template.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },

  async follow(id) {
    const response = await template.post(`follow/${id}`, {});
    return response.data;
  },

  async unfollow(id) {
    const response = await template.delete(`follow/${id}`);
    return response.data;
  },
};

export const profileAPI = {
  async loadProfile(id) {
    const response = await template.get(`profile/${id}`);
    return response.data;
  },

  async loadStatus(id) {
    const response = await template.get(`profile/status/${id}`);
    return response.data;
  },

  async updateStatus(status) {
    const response = await template.put(`profile/status/`, { status });
    return response.data;
  },
};

export const authAPI = {
  async me() {
    const response = await template.get(`auth/me/`);
    return response.data;
  },

  async login(email, password, rememberMe) {
    const response = await template.post('auth/login/', {
      email,
      password,
      rememberMe,
    });
    return response.data;
  },

  async logout() {
    const response = await template.delete('auth/login/');
    return response.data;
  },
};
