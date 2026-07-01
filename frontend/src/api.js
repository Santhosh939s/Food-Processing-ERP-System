import axios from 'axios';

// Create an Axios instance that defaults to the Vercel environment variable
// If the variable isn't set, it falls back to the local backend for development
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Optionally add an interceptor to attach JWT tokens to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
