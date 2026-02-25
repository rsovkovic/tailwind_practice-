'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks, RecommendBooksResponse } from '@/app/api/books';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { SupportBlock } from '@/components/Dashboard/Support';
import { Quote } from '@/components/Dashboard/Quote';
import BooksRecommended from '@/components/BooksRecommended/BooksRecommended';
import { FiltersForm } from '@/components/Dashboard/FiltersForm';

export default function RecommendedPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ title: '', author: '' });
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      // Якщо ширина менша за 640px (sm у Tailwind) — ставимо 2 книги
      // Якщо від 640px до 1024px — можна поставити 4 книги
      // Якщо більше 1024px — 10 книг (або 5, якщо хочете рівно один ряд)
      if (window.innerWidth < 768) {
        setLimit(2);
      } else if (window.innerWidth < 1040) {
        setLimit(8); // наприклад, 2 ряди по 4
      } else {
        setLimit(10); // 2 ряди по 5
      }
    };

    handleResize(); // викликаємо при першому рендері
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleApplyFilters = (data: { title: string; author: string }) => {
    // console.log('Отримано з форми:', data);
    setFilters(data);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<RecommendBooksResponse>({
    // queryKey: ['books', { page, title: debouncedTitle, author }],
    queryKey: ['books', page, filters, limit],
    queryFn: () =>
      fetchBooks({
        ...filters,
        page,
        // author,
        // title: debouncedTitle || undefined,
        limit,
      }),
    placeholderData: (prev) => prev,
  });
  return (
    <section>
      <div className="container">
        <div className="mt-4 mb-8 flex flex-col items-stretch gap-4 lg:flex-row">
          <Dashboard>
            <FiltersForm onFilter={handleApplyFilters} />
            <SupportBlock />
            <div className="hidden lg:block">
              <Quote />
            </div>
          </Dashboard>

          <div className="bg-secondary-bg min-w-0 flex-1 rounded-[30px]">
            <BooksRecommended
              data={data}
              isLoading={isLoading}
              isError={isError}
              page={page}
              onPageChange={(nextPage) => setPage(nextPage)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
