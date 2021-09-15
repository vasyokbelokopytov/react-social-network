import { UserPhotosType, ProfileType } from '../types/types';
import { template, ResponseType } from './api';

type SavePhotoType = {
  photos: UserPhotosType;
};

type LoadStatusType = string | null;

export const profileAPI = {
  async loadProfile(id: number) {
    const response = await template.get<ProfileType>(`profile/${id}`);
    return response.data;
  },

  async updateProfile(profile: ProfileType) {
    const response = await template.put<ResponseType>(`profile`, profile);
    return response.data;
  },

  async loadStatus(id: number) {
    const response = await template.get<LoadStatusType>(`profile/status/${id}`);
    return response.data;
  },

  async updateStatus(status: string) {
    const response = await template.put<ResponseType>(`profile/status/`, {
      status,
    });
    return response.data;
  },

  async savePhoto(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await template.put<ResponseType<SavePhotoType>>(
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