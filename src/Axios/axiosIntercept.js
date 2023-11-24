// axios.js (create a separate file for Axios setup)

import axios from 'axios';

const instance = axios.create();

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
