// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import Cookies from 'js-cookie';

// interface AuthState {
//   token: string | null;
//   refreshToken: string | null; // Додаємо, бо API його повертає
//   user: {
//     name: string;
//     email: string;
//   } | null;
//   isLoggedIn: boolean;
//   setAuth: (data: {
//     name: string;
//     email: string;
//     token: string;
//     refreshToken: string;
//   }) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       token: null,
//       refreshToken: null,
//       user: null,
//       isLoggedIn: false,
//       setAuth: (data) => {
//         // Зберігаємо обидва токени в Cookies для Middleware
//         Cookies.set('token', data.token, { expires: 7 });
//         Cookies.set('refreshToken', data.refreshToken, { expires: 30 });

//         set({
//           token: data.token,
//           refreshToken: data.refreshToken,
//           user: { name: data.name, email: data.email },
//           isLoggedIn: true,
//         });
//       },
//       logout: () => {
//         Cookies.remove('token');
//         Cookies.remove('refreshToken');
//         set({ token: null, refreshToken: null, user: null, isLoggedIn: false });
//       },
//     }),
//     { name: 'auth-storage' },
//   ),
// );
