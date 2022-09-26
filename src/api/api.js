import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: (status) => {
    return status >= 200 && status < 400;
  },
});

apiClient.interceptors.request.use(async function (res) {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return res;
});

export function changeClientBearerToken(token) {
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
}
