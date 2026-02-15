'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '@/app/api/auth'; // шлях до вашого axios файлу
import Image from 'next/image';

export default function RecommendedPage() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['books', { page, title }],
    queryFn: () => fetchBooks({ page, title: title || undefined, limit: 10 }),
    placeholderData: (prev) => prev, // утримує старі дані під час завантаження нових
  });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Рекомендовані книги</h1>

      {/* Поле пошуку */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Пошук за назвою..."
          className="rounded border p-2 text-black"
          onChange={(e) => {
            setTitle(e.target.value);
            setPage(1); // скидаємо на 1 сторінку при пошуку
          }}
        />
      </div>

      {/* Відладочна інформація: бачимо що приходить з API */}
      <div className="mb-6 max-h-40 overflow-auto rounded bg-gray-800 p-4 text-green-400">
        <p className="mb-2 text-xs text-gray-400"> API Response Debug:</p>
        <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
      </div>

      {isLoading ? (
        <p>Завантаження...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data?.results.map((book) => (
            <div key={book._id} className="rounded-lg border p-4 shadow-sm">
              <div className="relative h-75 w-full">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill // Заповнює весь контейнер
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="rounded-lg object-contain"
                />
              </div>
              <h2 className="font-bold">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.author}</p>
              <div className="mt-2 inline-block rounded bg-blue-100 px-2 py-1 text-xs">
                {book.totalPages} стор.
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Проста пагінація */}
      <div className="mt-8 flex gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded bg-black px-4 py-2 text-white disabled:bg-gray-300"
        >
          Назад
        </button>
        <span className="self-center font-medium">Сторінка {page}</span>
        <button
          disabled={data && page >= data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded bg-black px-4 py-2 text-white disabled:bg-gray-300"
        >
          Вперед
        </button>
      </div>
    </main>
  );
}
