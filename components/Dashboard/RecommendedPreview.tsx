'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '@/app/api/books';
// import Image from 'next/image';

import Link from 'next/link';
import BookCard from '../BookCard/BookCard';

export default function RecommendedPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ['recommended', 1, 3],
    queryFn: () => fetchBooks({ page: 1, limit: 3 }),
  });

  const books = data?.results || [];

  return (
    // Спрощений приклад структури
    <div className="flex flex-col gap-5 rounded-3xl bg-(--input-bg) p-5">
      <h3 className="text-foreground text-lg font-bold">Recommended books</h3>

      {isLoading ? (
        <p className="text-sm text-(--text-secondary)">Loading...</p>
      ) : (
        <div className="flex gap-5 px-1">
          {books.map((book, idx) => (
            <BookCard
              key={book._id}
              book={book}
              index={idx}
              isSmall={true} // Ось тут вмикаємо малий режим
            />
          ))}
        </div>
      )}
      <div className="mt-5 flex items-center justify-between pt-4">
        <Link
          href="/recommended"
          className="hover:text-foreground flex items-center gap-2 text-sm text-(--text-secondary) underline transition-colors"
        >
          Home
        </Link>
        <svg className="h-6 w-6">
          <use href="/sprite.svg#icon-log-in" />
        </svg>
      </div>
    </div>
  );
}
