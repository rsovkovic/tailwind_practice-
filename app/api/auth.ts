import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Тип для даних логіну
export interface LoginData {
  email: string;
  password: string;
}
interface AuthResponse {
  name: string;
  email: string;
  token: string;
}
export const register = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/users/signup', userData);
  return data;
};

export const login = async (userData: LoginData): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/users/signin', userData);
  return data;
};
