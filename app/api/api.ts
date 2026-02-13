import axios from 'axios';

const instance = axios.create({
  // Next.js автоматично підтягне це з твого .env
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Автоматично додаємо токен до кожного запиту
instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default instance;
