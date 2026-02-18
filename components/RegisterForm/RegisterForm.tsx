'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/utils/validationSchemas';
import { register as registerUser, RegisterData } from '@/app/api/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

export const RegisterForm = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await registerUser(data);
      // localStorage.setItem('token', response.token);
      setLogin(response);
      toast.success('Registration successful!');
      router.push('/recommended');
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-118 flex-col gap-5"
    >
      <div className="flex flex-col gap-3">
        {/* Name Input */}
        <div className="flex flex-col">
          <div
            className={`flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5 transition-all ${errors.name ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
          >
            <span className="mr-2 text-sm font-medium text-(--text-secondary)">
              Name:
            </span>
            <input
              {...register('name')}
              autoComplete="name"
              placeholder="Ilona Ratushniak"
              className="text-foreground placeholder:text-foreground w-full border-none bg-transparent p-0 outline-none"
            />
          </div>
          {errors.name && (
            <p className="mt-1 ml-4 text-[10px] text-(--error-red)">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="flex flex-col">
          <div
            className={`flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5 transition-all ${errors.email ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
          >
            <span className="mr-2 text-sm font-medium text-(--text-secondary)">
              Mail:
            </span>
            <input
              {...register('email')}
              autoComplete="username"
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
              autoComplete="new-password"
              placeholder="Yourpasswordhere"
              className="text-foreground placeholder:text-foreground w-full border-none bg-transparent p-0 outline-none"
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
          Registration
        </button>
        <Link
          href="/login"
          className="hover:text-foreground text-sm text-(--text-secondary) underline transition-colors"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useRouter } from 'next/navigation';
// import { useMutation } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import Link from 'next/link';
// import { Eye, EyeOff } from 'lucide-react';
// import axios from 'axios';

// import { registerSchema } from '@/utils/validationSchemas';
// import { register as registerUser, RegisterData } from '@/app/api/auth';
// import { useAuthStore } from '@/store/authStore'; // Імпортуйте ваш стор

// export const RegisterForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const setAuth = useAuthStore((state) => state.setAuth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterData>({
//     resolver: yupResolver(registerSchema),
//   });

//   // Використовуємо Mutation для обробки запиту
//   const { mutate, isPending } = useMutation({
//     mutationFn: (data: RegisterData) => registerUser(data),
//     onSuccess: (response) => {
//       // Зберігаємо дані в Zustand (він сам оновить localStorage/Cookies)
//       setAuth({ name: response.name, email: response.email }, response.token);

//       toast.success('Registration successful!');
//       router.push('/recommended');
//     },
//     onError: (error: unknown) => {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || 'Something went wrong');
//       }
//     },
//   });

//   const onSubmit = (data: RegisterData) => {
//     mutate(data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex w-full max-w-118 flex-col gap-5"
//     >
//       <div className="flex flex-col gap-3">
//         {/* Name Input */}
//         <div className="flex flex-col">
//           <div
//             className={`flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5 transition-all ${errors.name ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
//           >
//             <span className="mr-2 text-sm font-medium text-(--text-secondary)">
//               Name:
//             </span>
//             <input
//               {...register('name')}
//               autoComplete="name"
//               placeholder="Ilona Ratushniak"
//               className="text-foreground placeholder:text-foreground w-full border-none bg-transparent p-0 outline-none"
//             />
//           </div>
//           {errors.name && (
//             <p className="mt-1 ml-4 text-[10px] text-(--error-red)">
//               {errors.name.message}
//             </p>
//           )}
//         </div>

//         {/* Email Input */}
//         <div className="flex flex-col">
//           <div
//             className={`flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5 transition-all ${errors.email ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
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

//         {/* Password Input */}
//         <div className="flex flex-col">
//           <div
//             className={`flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5 transition-all ${errors.password ? 'border-(--error-red)' : 'focus-within:border-primary border-(--input-border)'}`}
//           >
//             <span className="mr-2 text-sm font-medium text-(--text-secondary)">
//               Password:
//             </span>
//             <input
//               {...register('password')}
//               type={showPassword ? 'text' : 'password'}
//               autoComplete="new-password"
//               placeholder="Yourpasswordhere"
//               className="text-foreground placeholder:text-foreground w-full border-none bg-transparent p-0 outline-none"
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

//       <div className="mt-4 flex items-center gap-5">
//         <button
//           type="submit"
//           disabled={isPending}
//           className="hover:bg-background bg-foreground text-background hover:text-foreground rounded-full px-10 py-3 font-bold transition-all active:scale-95 disabled:opacity-50"
//         >
//           {isPending ? 'Processing...' : 'Registration'}
//         </button>
//         <Link
//           href="/login"
//           className="hover:text-foreground text-sm text-(--text-secondary) underline transition-colors"
//         >
//           Already have an account?
//         </Link>
//       </div>
//     </form>
//   );
// };
