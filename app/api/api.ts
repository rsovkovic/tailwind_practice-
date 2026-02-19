import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
});

// 1. Додаємо звичайний токен до кожного запиту
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Обробка помилки 401 та автоматичний рефреш
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const currentRefreshToken = useAuthStore.getState().user?.refreshToken;

      // 2. ПЕРЕВІРКА: Якщо токена немає в сторі — одразу виходимо (Insert point)
      if (!currentRefreshToken) {
        useAuthStore.getState().setLogout();
        return Promise.reject(error);
      }

      try {
        // ВАЖЛИВО: Для рефрешу ми передаємо refreshToken у HEADERS
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/current/refresh`,
          {}, // Порожній body
          {
            headers: {
              Authorization: `Bearer ${currentRefreshToken}`,
            },
          },
        );

        // data прийде як { token: "...", refreshToken: "..." }
        // Оновлюємо стор, зберігаючи ім'я та імейл, які вже там були
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          useAuthStore.getState().setLogin({
            ...currentUser,
            token: data.token,
            refreshToken: data.refreshToken,
          });
        }

        // Повторюємо запит із НОВИМ токеном
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().setLogout();
        // window.location.href = '/login'; // Можна розкоментувати для жорсткого редиректу
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
