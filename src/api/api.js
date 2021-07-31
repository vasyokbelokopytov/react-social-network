import * as axios from 'axios';

const template = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a4fa4ef1-f845-4321-a530-4f875beff57f',
  },
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return template
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  follow(id) {
    return template.post(`follow/${id}`, {}).then((response) => response.data);
  },

  unfollow(id) {
    return template.delete(`follow/${id}`).then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(id) {
    return template.get(`profile/${id}`).then((response) => response.data);
  },

  getStatus(id) {
    return template
      .get(`profile/status/${id}`)
      .then((response) => response.data);
  },

  updateStatus(status) {
    return template
      .put(`profile/status/`, { status })
      .then((response) => response.data);
  },
};

export const authAPI = {
  me() {
    return template.get(`auth/me`).then((response) => response.data);
  },

  login(email, password, rememberMe) {
    return template
      .post('auth/login', { email, password, rememberMe })
      .then((response) => response.data);
  },

  logout() {
    return template.delete('auth/login').then((response) => response.data);
  },
};
