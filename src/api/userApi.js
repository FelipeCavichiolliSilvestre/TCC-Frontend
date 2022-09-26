import { apiClient } from './api';

export async function login({ login, password }) {
  const res = await apiClient.post('/users/login', { login, password });

  return res.data;
}

export async function getMe() {
  const res = await apiClient.get('/users/me');

  return res.data;
}

export default {
  login,
  getMe,
};
