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
