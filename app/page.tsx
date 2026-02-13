// import Image from 'next/image';

// export default function Home() {
//   return (
//     <main>
//       <div className="container">
//         <p className="text-center">Hello world </p>
//       </div>
//     </main>
//   );
// }

// 'use client';
// import { useState } from 'react';
// import LoginForm from '@/components/LoginForm/LoginForm';
// import { RegisterForm } from '@/components/RegisterForm/RegisterForm';

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <main className="container flex min-h-screen items-center justify-center bg-zinc-950">
//       <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
//         {isLogin ? (
//           <LoginForm onToggle={() => setIsLogin(false)} />
//         ) : (
//           <RegisterForm onToggle={() => setIsLogin(true)} />
//         )}
//       </div>
//     </main>
//   );
// }
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/recommended');
    } else {
      // Якщо не залогінений — відправляємо на реєстрацію
      router.push('/register');
    }
  }, [router]);

  return null; // Сторінка нічого не рендерить, лише перенаправляє
}
