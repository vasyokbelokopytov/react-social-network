import {
  UserPhotos,
  Profile,
  ProfileFormData,
  UserStatus,
  FollowingStatus,
} from '../../app/types';
import { template, Response } from '../../app/api';

export const profileAPI = {
  async fetchProfile(id: number) {
    const response = await template.get<Profile>(`profile/${id}`);
    return response.data;
  },

  async updateProfile(profile: Profile | ProfileFormData) {
    const response = await template.put<Response>(`profile`, profile);
    return response.data;
  },

  async checkFollowing(id: number) {
    const response = await template.get<FollowingStatus>(`follow/${id}`);
    return response.data;
  },

  async fetchStatus(id: number) {
    const response = await template.get<UserStatus>(`profile/status/${id}`);
    return response.data;
  },

  async updateStatus(status: string) {
    const response = await template.put<Response>(`profile/status/`, {
      status,
    });
    return response.data;
  },

  async savePhoto(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await template.put<Response<{ photos: UserPhotos }>>(
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
