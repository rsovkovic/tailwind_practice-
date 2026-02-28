// 'use client';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { loginSchema } from '@/utils/validationSchemas';
// import { login, LoginData } from '@/app/api/auth';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import Link from 'next/link';
// import { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import axios from 'axios';
// import { useAuthStore } from '@/lib/store/authStore';

// export const LoginForm = () => {
//   const setLogin = useAuthStore((state) => state.setLogin);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginData>({
//     resolver: yupResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginData) => {
//     try {
//       const response = await login(data);
//       // localStorage.setItem('token', response.token);
//       setLogin(response);
//       toast.success('Congratulations again!');
//       router.push('/recommended');
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error))
//         toast.error(error.response?.data?.message || 'login error');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex w-full max-w-118 flex-col gap-5"
//     >
//       <div className="flex flex-col gap-3">
//         <div className="flex flex-col">
//           <div
//             className={`flex items-center rounded-xl bg-(--input-bg) px-4 py-3.5 transition-all focus-within:border ${errors.email ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
//           >
//             <span className="mr-2 text-sm font-medium text-(--text-secondary)">
//               Mail:
//             </span>
//             <input
//               {...register('email')}
//               autoComplete="username"
//               placeholder="Your@email.com"
//               className="text-foreground placeholder:text-foreground w-full border-none bg-transparent p-0 outline-none"
//             />
//           </div>
//           {errors.email && (
//             <p className="mt-1 ml-4 text-[10px] text-(--error-red)">
//               {errors.email.message}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <div
//             className={`flex items-center rounded-xl bg-(--input-bg) px-4 py-3.5 transition-all focus-within:border hover:border ${errors.password ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
//           >
//             <span className="mr-2 text-sm font-medium text-(--text-secondary)">
//               Password:
//             </span>
//             <input
//               {...register('password')}
//               type={showPassword ? 'text' : 'password'}
//               autoComplete="current-password"
//               placeholder="Yourpasswordhere"
//               className="placeholder:text-foreground text-foreground w-full border-none bg-transparent p-0 outline-none"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="text-secondary hover:text-primary ml-2 transition-colors"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="mt-1 ml-4 text-[10px] text-(--error-red)">
//               {errors.password.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-4 flex items-center gap-5">
//         <button
//           type="submit"
//           className="hover:bg-background bg-foreground text-background hover:text-foreground rounded-full px-10 py-3 font-bold transition duration-200 ease-out active:scale-95"
//         >
//           Login in
//         </button>
//         <Link
//           href="/register"
//           className="hover:text-foreground text-sm text-(--text-secondary) underline transition-colors"
//         >
//           Don’t have an account?
//         </Link>
//       </div>
//     </form>
//   );
// };

/////////////////////////////////////

'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/utils/validationSchemas';
import { login, LoginData } from '@/app/api/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';
import { Input } from '../Ui/Input';
import { Button } from '../Ui/Button';

export const LoginForm = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await login(data);
      // localStorage.setItem('token', response.token);
      setLogin(response);
      toast.success('Congratulations again!');
      router.push('/recommended');
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.message || 'login error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-118 flex-col gap-5"
    >
      <div className="flex flex-col gap-3">
        {/* Email Input */}
        <Input
          label="Mail:"
          {...register('email')}
          autoComplete="username"
          placeholder="Your@email.com"
          error={errors.email?.message}
        />

        {/* Password Input */}
        <Input
          label="Password:"
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Yourpasswordhere"
          error={errors.password?.message}
        >
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-secondary hover:text-primary ml-2 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </Input>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-5">
        <Button type="submit" variant="primary" className="px-10">
          Login in
        </Button>
        <Link
          href="/register"
          className="hover:text-foreground text-sm text-(--text-secondary) underline transition-colors"
        >
          Don’t have an account?
        </Link>
      </div>
    </form>
  );
};
