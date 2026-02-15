import type { AxiosResponse } from 'axios';
import api from './axios.instance';
import type { User } from './users';

export interface LoginResponse extends Pick<User, 'id' | 'username' | 'email' | 'firstName' | 'lastName' | 'gender' | 'image'> {
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest extends Pick<User, 'username' | 'password'> {
  expiresInMins?: number;
}

type RefreshTokenResponse = Pick<LoginResponse, 'accessToken' | 'refreshToken'>;

export const AuthService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', data);
    return response.data;
  },

  async refreshToken(refreshToken: LoginResponse['refreshToken']): Promise<RefreshTokenResponse> {
    const response: AxiosResponse<RefreshTokenResponse> = await api.post('/auth/refresh', {
      refreshToken
    });
    return response.data;
  },
}