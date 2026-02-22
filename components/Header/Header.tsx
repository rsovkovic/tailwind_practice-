'use client';

import { logout as logoutApi } from '@/app/api/auth';
import toast from 'react-hot-toast';
import MainNavigation from '../MainNavigation/MainNavigation';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { UserBar } from '../UseBar/UseBar';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AxiosError } from 'axios';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setLogout, isLoggedIn } = useAuthStore();
  const router = useRouter();
  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');

    try {
      await logoutApi();

      toast.success('Successfully logged out!', { id: toastId });
    } catch (error) {
      // 2. Якщо бекенд повернув помилку (наприклад, 401 або 500)
      // ТЗ каже: опрацювати і відобразити помилку
      const err = error as AxiosError<{ message?: string }>;

      const errorMessage =
        err.response?.data?.message || 'Server error during logout';
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLogout(); //  метод із Zustand (очищення стору та localStorage)

      if (isMenuOpen) setIsMenuOpen(false); // Закриваємо бургер

      router.push('/register'); // Редирект на сторінку реєстрації
    }
  };

  return (
    <header className="w-full">
      <div className="container pt-8">
        <div className="bg-secondary-bg flex h-20 items-center justify-between rounded-3xl px-5 sm:px-7">
          <div className="flex items-center gap-2">
            <svg className="h-4.25 w-10.5" aria-hidden="true">
              <use href="/sprite.svg#icon-logo" />
            </svg>

            <span className="text-foreground hidden text-lg font-bold tracking-tighter uppercase md:block">
              Read Journey
            </span>
          </div>
          <nav aria-label="Main Navigation" className="hidden md:block">
            <MainNavigation />
          </nav>
          {/* БЛОК КОРИСТУВАЧА (Поки що заглушка) */}
          <div className="flex items-center gap-4">
            {/* Тут буде ваш компонент UserBar */}

            <UserBar />

            {/* Log out (тільки десктоп) */}
            <button
              className="text-foreground hover:bg-foreground hover:text-background hidden rounded-full border border-white/20 px-5 py-3 font-bold transition duration-200 ease-out active:scale-95 md:block"
              onClick={handleLogout}
            >
              Log out
            </button>

            {/* Бургер-іконка (тільки мобайл/планшет) */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <svg className="h-7 w-7 stroke-white">
                <use href="/sprite.svg#icon-burger-menu" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLogout={handleLogout}
        // onLogout={setLogout}
      />
    </header>
  );
}
