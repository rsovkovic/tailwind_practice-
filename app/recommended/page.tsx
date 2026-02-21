'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks, RecommendBooksResponse } from '@/app/api/books';
// import { useDebounce } from 'use-debounce';
import BooksRecommended from '@/components/BooksRecommended/BooksRecommended';
import { FiltersForm } from '@/components/FiltersForm/FiltersForm';

export default function RecommendedPage() {
  const [page, setPage] = useState(1);
  // const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  const [filters, setFilters] = useState({ title: '', author: '' });
  // const [debouncedTitle] = useDebounce(title, 500);

  const handleApplyFilters = (data: { title: string; author: string }) => {
    console.log('Отримано з форми:', data);
    setFilters(data);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<RecommendBooksResponse>({
    // queryKey: ['books', { page, title: debouncedTitle, author }],
    queryKey: ['books', page, filters],
    queryFn: () =>
      fetchBooks({
        ...filters,
        page,
        // author,
        // title: debouncedTitle || undefined,
        limit: 10,
      }),
    placeholderData: (prev) => prev,
  });
  return (
    <main className="container">
      <FiltersForm onFilter={handleApplyFilters} />
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
