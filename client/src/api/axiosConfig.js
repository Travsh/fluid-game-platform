import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9080/v1',
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
  },
});

console.log(localStorage.getItem('jwt'));

instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

export default instance;
