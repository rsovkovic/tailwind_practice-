'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BooksResponse, BookStatus, getOwnBooks } from '@/app/api/books';
import BookCard from '@/components/BookCard/BookCard';
import Image from 'next/image';
// import BookDetailsModal from '@/components/Modals/BookDetailsModal'; // Твоя майбутня модалка

interface Props {
  onDeleteBook: (id: string) => void;
}
export default function MyLibraryBooks({ onDeleteBook }: Props) {
  const [status, setStatus] = useState<BookStatus | undefined>(undefined);
  const [selectedBookId, setSelectedBookId] = useState<BooksResponse | null>(
    null,
  );

  const { data, isLoading } = useQuery<BooksResponse[]>({
    queryKey: ['user-books', status],
    queryFn: () => getOwnBooks(status),
  });

  const books = data || [];
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Library</h1>

        {/* Селект для фільтрації */}
        <select
          onChange={(e) =>
            setStatus((e.target.value as BookStatus) || undefined)
          }
          className="bg-background rounded-md border border-white/20 px-3 py-2 text-sm"
        >
          <option value="">All books</option>
          <option value="unread">Unread</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* 2. УМОВА: Якщо книг немає — показуємо картинку, якщо є — сітку */}
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          {/* Контейнер для картинки (з макету) */}
          <div className="mb-5 flex h-25 w-25 items-center justify-center rounded-full bg-(--bg-blok) md:h-32.5 md:w-32.5">
            <Image
              src="/books_desktop.png" // Шлях до картинки з макету
              alt="Empty library"
              width={0.5}
              height={0.5}
              className="h-12.5 w-12.5 md:h-17.5 md:w-17.5"
            />
          </div>

          <p className="max-w-50 text-sm leading-5 md:max-w-70 lg:max-w-none">
            To start training, add
            <span className="text-(--text-secondary)">
              {' '}
              some of your books{' '}
            </span>
            {/* <br /> */}
            <span className="lg:block">or from the recommended ones.</span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3 xl:grid-cols-5">
          {books.map((book, index) => (
            <BookCard
              key={book._id}
              book={book}
              index={index}
              isLibrary={true}
              onDelete={() => onDeleteBook(book._id)}
              onClick={() => setSelectedBookId(book)} // Відкриваємо модалку
            />
          ))}
        </div>
      )}
      {/* Модалка з деталями */}
      {/* {selectedBookId && (
        <BookDetailsModal
          bookId={selectedBookId}
          onClose={() => setSelectedBookId(null)}
        />
      )} */}
    </div>
  );
}
