// 'use client';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { loginSchema } from '@/utils/validationSchemas';
// import { login, LoginData } from '@/app/api/auth';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import Link from 'next/link';
// import axios from 'axios';

// export default function LoginForm() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginData) => {
//     try {
//       const response = await login(data);
//       localStorage.setItem('token', response.token);
//       toast.success('Congratulations again!');
//       router.push('/recommended');
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || 'Login error');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
//       <input
//         {...register('email')}
//         placeholder="Email"
//         className="rounded border p-2 text-black"
//       />
//       <p className="text-xs text-red-500">{errors.email?.message}</p>

//       <input
//         {...register('password')}
//         type="password"
//         placeholder="Password"
//         className="rounded border p-2 text-black"
//       />
//       <p className="text-xs text-red-500">{errors.password?.message}</p>

//       <button type="submit" className="rounded bg-green-600 p-2 text-white">
//         Log In
//       </button>
//       <Link href="/register" className="text-sm underline">
//         Don’t have an account?
//       </Link>
//     </form>
//   );
// }
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

export const LoginForm = () => {
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
      localStorage.setItem('token', response.token);
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
        {/* <label className="text-primary mb-2 ml-4 block text-sm font-medium">
            Email:
          </label> */}
        {/* <div className="relative">
          <input
            {...register('email')}
            placeholder="ilan@gmail.com"
            className={`text-primary placeholder:text-secondary w-full rounded-xl border bg-(--input-bg) p-4 transition-all outline-none ${errors.email ? 'border-(--error-red)' : 'border-(--input-border) focus:border-(--accent-blue)'}`}
          />
          {errors.email && (
            <p className="mt-1 ml-4 text-xs text-(--error-red)">
              {errors.email.message}
            </p>
          )}
        </div> */}

        <div className="flex flex-col">
          <div
            className={`flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5 transition-all ${errors.email ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
          >
            <span className="mr-2 text-sm font-medium text-(--text-secondary)">
              Mail:
            </span>
            <input
              {...register('email')}
              placeholder="Your@email.com"
              className="text-foreground placeholder:text-foreground w-full border-none bg-transparent p-0 outline-none"
            />
          </div>
          {errors.email && (
            <p className="mt-1 ml-4 text-[10px] text-(--error-red)">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        {/* <label className="text-primary mb-2 ml-4 block text-sm font-medium">
            Password:
          </label> */}
        {/* <div className="relative">
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 7 characters"
              className={`text-primary placeholder:text-secondary w-full rounded-xl border bg-(--input-bg) p-4 transition-all outline-none ${errors.password ? 'border-(--error-red)' : 'border-(--input-border) focus:border-(--accent-blue)'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-secondary hover:text-primary absolute top-1/2 right-4 -translate-y-1/2 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 ml-4 text-xs text-(--error-red)">
              {errors.password.message}
            </p>
          )}
        </div> */}
        <div className="flex flex-col">
          <div
            className={`flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5 transition-all ${errors.password ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
          >
            <span className="mr-2 text-sm font-medium text-(--text-secondary)">
              Password:
            </span>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Yourpasswordhere"
              className="placeholder:text-foreground text-foreground w-full border-none bg-transparent p-0 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-secondary hover:text-primary ml-2 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 ml-4 text-[10px] text-(--error-red)">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-5">
        <button
          type="submit"
          className="hover:bg-background bg-foreground text-background hover:text-foreground rounded-full px-10 py-3 font-bold transition-all active:scale-95"
        >
          Login in
        </button>
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
