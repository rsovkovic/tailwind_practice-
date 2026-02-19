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

export interface AuthResponse {
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

export interface UsersCurrentRefreshResponse {
  token: string;
  refreshToken: string;
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

export const logout = async (): Promise<void> => {
  await api.post('/users/signout');
};

export const usersCurrent = async (): Promise<CurrentUsers> => {
  const { data } = await api.get<CurrentUsers>('/users/current');
  return data;
};
export const usersCurrentRefresh = async (
  refreshToken: string,
): Promise<UsersCurrentRefreshResponse> => {
  const { data } = await api.get<UsersCurrentRefreshResponse>(
    '/users/current/refresh',
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  return data;
};

// export interface RegisterData {
//   name: string;
//   email: string;
//   password: string;
// }

// export interface LoginData {
//   email: string;
//   password: string;
// }

// export interface AuthUser {
//   name: string;
//   email: string;
// }

// // REGISTER
// export const register = async (userData: RegisterData): Promise<AuthUser> => {
//   const res = await fetch('/api/auth/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//     credentials: 'include',
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message);
//   }

//   return res.json();
// };

// // LOGIN
// export const login = async (userData: LoginData): Promise<AuthUser> => {
//   const res = await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//     credentials: 'include',
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message);
//   }

//   return res.json();
// };

// // LOGOUT
// export const logout = async () => {
//   await fetch('/api/auth/logout', {
//     method: 'POST',
//     credentials: 'include',
//   });
// };
