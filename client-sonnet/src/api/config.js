import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9080';

const api = axios.create({
  baseURL: 'http://localhost:9080',
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    // Handle unauthorized access (e.g., redirect to login)
    localStorage.removeItem('jwt');
    window.location = '/login';
  }
  return Promise.reject(error);
});

export default api;