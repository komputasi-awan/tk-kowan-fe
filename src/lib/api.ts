// src/lib/api.ts
import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

// Interceptor: setiap kali mau request, cek user login & ambil token
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  // if user is logged in, get the ID token and set it in the Authorization header
  if (user) {
    const token = await user.getIdToken(); 
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;