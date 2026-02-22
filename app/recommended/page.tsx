'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks, RecommendBooksResponse } from '@/app/api/books';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { SupportBlock } from '@/components/Dashboard/Support';
import { Quote } from '@/components/Dashboard/Quote';
import BooksRecommended from '@/components/BooksRecommended/BooksRecommended';
import { FiltersForm } from '@/components/Dashboard/FiltersForm';
// import { FiltersForm } from '@/components/FiltersForm/FiltersForm';

export default function RecommendedPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ title: '', author: '' });

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
    <section className="container py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Dashboard>
          <FiltersForm onFilter={handleApplyFilters} />
          <SupportBlock />
          <div className="hidden lg:mt-20 lg:block">
            <Quote />
          </div>
        </Dashboard>
        <main className="h-fit w-full min-w-0 flex-1 rounded-[30px] bg-[#1F1F1F]">
          <BooksRecommended
            data={data}
            isLoading={isLoading}
            isError={isError}
            page={page}
            onPageChange={(nextPage) => setPage(nextPage)}
          />
        </main>
      </div>
    </section>
  );
}
