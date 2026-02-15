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
  refreshToken: string;
}

export interface CurrentUsers {
  _id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface UsersCurrentRefresh {
  token: string;
  refreshToken: string;
}

export interface RecommendBooksResponse {
  results: Result[];
  totalPages: number;
  page: number;
  perPage: number;
}
export interface Result {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

export interface FetchBooksParams {
  title?: string;
  author?: string;
  page?: number;
  limit?: number;
}

export const fetchBooks = async ({
  title,
  author,
  page = 1,
  limit = 10,
}: FetchBooksParams): Promise<RecommendBooksResponse> => {
  const { data } = await api.get<RecommendBooksResponse>('/books/recommend', {
    params: {
      title: title?.trim() || undefined,
      author: author?.trim() || undefined,
      page,
      limit,
    },
  });
  return data;
};

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
