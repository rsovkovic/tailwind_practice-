'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks, RecommendBooksResponse } from '@/app/api/books';
import { useDebounce } from 'use-debounce';
import BooksRecommended from '@/components/BooksRecommended/BooksRecommended';

export default function RecommendedPage() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [debouncedTitle] = useDebounce(title, 500);

  const { data, isLoading, isError } = useQuery<RecommendBooksResponse>({
    queryKey: ['books', { page, title: debouncedTitle, author }],
    queryFn: () =>
      fetchBooks({
        page,
        author,
        title: debouncedTitle || undefined,
        limit: 10,
      }),
    placeholderData: (prev) => prev,
  });
  return (
    <main>
      <BooksRecommended
        data={data}
        isLoading={isLoading}
        isError={isError}
        page={page}
        onPageChange={(nextPage) => setPage(nextPage)}
      />
    </main>
  );
}
