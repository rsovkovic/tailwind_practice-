'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore'; // шлях до твого стору
import { useHydrated } from '@/hooks/useHydrated'; // твій хук гідратації

export default function RootPage() {
  const router = useRouter();
  const isHydrated = useHydrated();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    // Чекаємо, поки Zustand підтягне дані з localStorage
    if (!isHydrated) return;

    if (isLoggedIn) {
      router.replace('/recommended');
    } else {
      router.replace('/register');
    }
  }, [isHydrated, isLoggedIn, router]);

  // Можна додати простий Loader, поки йде перевірка
  return null;
}

// interface BookCardProps {
//   book: ResultBook;
//   onOpenModal: (book: ResultBook) => void;
// }

// export const BookCard = ({ book, onOpenModal }: BookCardProps) => {
//   return (
//     <div className="..." onClick={() => onOpenModal(book)}>
//       {/* Твоя верстка за макетом */}
//     </div>
//   );
// };
