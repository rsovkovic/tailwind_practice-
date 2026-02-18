'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useHydrated } from '@/hooks/useHydrated';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PageLoader } from '../Loader/Loader';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  const hydrated = useHydrated();
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPath = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    if (!hydrated) return;

    // 1. Якщо не залогінений і на приватній сторінці — на реєстрацію (за ТЗ)
    if (!isLoggedIn && !isPublicPath) {
      router.replace('/register');
    }

    // 2. Якщо залогінений і на логіні/реєстрації — на рекомендовані (за ТЗ)
    if (isLoggedIn && isPublicPath) {
      router.replace('/recommended');
    }
  }, [isLoggedIn, hydrated, router, pathname, isPublicPath]);

  // Поки ми не знаємо, залогінений юзер чи ні (йде гідратація),
  // краще нічого не рендерити, щоб не було "блимання" контенту
  if (!hydrated) return <PageLoader />;

  if (!isLoggedIn && !isPublicPath) return null;

  if (isLoggedIn && isPublicPath) return null;

  return <>{children}</>;
};
