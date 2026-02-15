import axios, { type AxiosInstance } from 'axios';
import { getAccessToken } from '../utils';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://dummyjson.com' // TODO: Нынести в .env
});

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// instance.interceptors.response.use((config) => {
//   return config;
// }, (error) => {
//   const originalRequest = error.config;
//   originalRequest.isRetry = false;
//   if (error.response.status === 401 && originalRequest && !originalRequest.isRetry) {
//     originalRequest.isRetry = true;
//     try {
//       console.error('Нужен запрос для актуального токена');
//     } catch {
//       window.location.replace(/login)
//     }
//   } else {
//     throw error;
//   }
// })

export default instance;
