import type { LoginResponse } from "../api/auth";

type SaveToken = Pick<LoginResponse, 'accessToken' | 'refreshToken'>;

const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';

export const saveToken = (data: SaveToken): void => {
  localStorage.setItem(ACCESS_TOKEN_NAME, data[ACCESS_TOKEN_NAME]);
  localStorage.setItem(REFRESH_TOKEN_NAME, data[REFRESH_TOKEN_NAME]);
}

export const getAccessToken = (): LoginResponse['accessToken'] | null => {
  return localStorage.getItem(ACCESS_TOKEN_NAME) || null;
}
export const getRefreshToken = (): LoginResponse['refreshToken'] | null => {
  return localStorage.getItem(REFRESH_TOKEN_NAME) || null;
}