// 'use client';

// import BookCard from '../BookCard/BookCard';
// import Pagination from '../Pagination/Pagination';
// import { RecommendBooksResponse } from '@/app/api/books'; // Імпортуємо тип для даних

// interface BooksListProps {
//   data: RecommendBooksResponse | undefined;
//   isLoading: boolean;
//   isError: boolean;
//   page: number;
//   onPageChange: (nextPage: number) => void;
// }

// export default function BooksRecommended({
//   data,
//   isLoading,
//   isError,
//   page,
//   onPageChange,
// }: BooksListProps) {
//   return (
//     <div className="p-10 pb-5">
//       <div className="flex items-center justify-between pb-5">
//         <h2 className="text-xl font-bold sm:text-3xl">Recommended</h2>

//         {/* Пагінація тепер використовує пропси ззовні */}
//         {data && data.totalPages > 1 && (
//           <Pagination
//             page={page}
//             total={data.totalPages}
//             onChange={onPageChange}
//             isLoading={isLoading}
//           />
//         )}
//       </div>

//       {isLoading && !data ? (
//         <p>Loading...</p>
//       ) : isError ? (
//         <p className="text-(--error-red)">Error loading books</p>
//       ) : data?.results.length === 0 ? ( // ОСЬ ТУТ ЦЯ ПЕРЕВІРКА
//         <div className="flex flex-col items-center py-20">
//           <p className="text-lg text-white">No books found for your request</p>
//           <p className="text-gray-500">Try changing the filters</p>
//         </div>
//       ) : (
//         <ul className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
//           {/* // <ul className="flex snap-x flex-nowrap gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-4 lg:grid-cols-5"> */}
//           {data?.results.map((book, index) => (
//             <li key={book._id}>
//               <BookCard book={book} index={index} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

//////////////////////////////////////////////////////

'use client';

import BookCard from '../BookCard/BookCard';
import { PageLoader } from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { RecommendBooksResponse } from '@/app/api/books'; // Імпортуємо тип для даних

interface BooksListProps {
  data: RecommendBooksResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  page: number;
  onPageChange: (nextPage: number) => void;
}

export default function BooksRecommended({
  data,
  isLoading,
  isError,
  page,
  onPageChange,
}: BooksListProps) {
  if (isLoading && !data) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <PageLoader />
      </div>
    );
  }
  return (
    <div className="p-10 pb-5">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl font-bold sm:text-3xl">Recommended</h2>

        {/* Пагінація тепер використовує пропси ззовні */}
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            total={data.totalPages}
            onChange={onPageChange}
            isLoading={isLoading}
          />
        )}
      </div>
      {/* {isLoading && (
        <div className="inset-0 z-10 flex items-center justify-center bg-[#111111]/40 backdrop-blur-sm transition-all duration-300">
          <PageLoader />
        </div>
      )} */}
      {isError ? (
        <p className="text-(--error-red)">Error loading books</p>
      ) : data?.results.length === 0 ? ( // ОСЬ ТУТ ЦЯ ПЕРЕВІРКА
        <div className="flex flex-col items-center py-20">
          <p className="text-foreground text-lg">
            No books found for your request
          </p>
          <p className="text-(--text-secondary)">Try changing the filters</p>
        </div>
      ) : (
        // <ul
        //   className={`grid grid-cols-2 gap-x-4 gap-y-4 transition-opacity duration-200 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        // >
        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {data?.results.map((book, index) => (
            <li key={book._id}>
              <BookCard book={book} index={index} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchBooks, RecommendBooksResponse } from '@/app/api/books';
// import { useDebounce } from 'use-debounce';
// import BookCard from '../BookCard/BookCard';
// import Pagination from '../Pagination/Pagination';

// export default function RecommendedPage() {
//   const [page, setPage] = useState(1);
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [debouncedTitle] = useDebounce(title, 500);

//   const { data, isLoading, isError } = useQuery<RecommendBooksResponse>({
//     queryKey: ['books', { page, title: debouncedTitle, author }],
//     queryFn: () =>
//       fetchBooks({
//         page,
//         author,
//         title: debouncedTitle || undefined,
//         limit: 10,
//       }),
//     placeholderData: (prev) => prev,
//   });

//   return (
//     <main className="container pt-4">
//       <h1 className="mb-6 text-2xl font-bold">Recommended</h1>
//       {data && data.totalPages > 1 && (
//         <Pagination
//           page={page}
//           total={data.totalPages}
//           // onChange={handlePageChange}
//           onChange={(nextPage) => setPage(nextPage)}
//           isLoading={isLoading}
//         />
//       )}
//       {isLoading ? (
//         <p>loading...</p>
//       ) : isError ? (
//         <p className="text-red-500">Error loading book</p>
//       ) : (
//         <ul className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 lg:grid-cols-5">
//           {data?.results.map((book) => (
//             <li
//               key={book._id}
//               className="group shadow-card hover:shadow-card-hover overflow-hidden rounded-lg p-4 transition-(--card-transition) hover:-translate-y-1 hover:scale-105"
//             >
//               <BookCard book={book} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </main>
//   );
// }

{
  /* Поле пошуку
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Пошук за назвою..."
          className="bg-secondary-bg rounded border p-2"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setPage(1);
          }}
        />
        <input
          type="text"
          placeholder="Пошук за автором..."
          className="bg-secondary-bg rounded border p-2"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            setPage(1);
          }}
        />
      </div> */
}

// const handlePageChange = (nextPage: number) => {
//   setPage(nextPage);
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// };

{
  /* Проста пагінація */
}
{
  /* <div className="mt-8 flex gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded bg-black px-4 py-2 text-white disabled:bg-gray-300"
        >
          Back
        </button>
        <button
          disabled={data && page >= data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded bg-black px-4 py-2 text-white disabled:bg-gray-300"
        >
          Forward
        </button>
      </div> */
}

// className="shadow-card hover:shadow-card-hover rounded-lg border border-white/10 p-4 transition-(--card-transition) hover:-translate-y-1 hover:scale-[1.03]"

{
  /* <div className="relative mb-4 h-72 w-full">
                <Image
                  src={book.imageUrl || 'https://placehold.co'}
                  alt={book.title}
                  fill // Заповнює весь контейнер
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  priority={page === 1}
                />
              </div>
              <h2 className="font-bold">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.author}</p>
              <div className="mt-2 inline-block rounded bg-blue-100 px-2 py-1 text-xs">
                {book.totalPages} стор.
              </div> */
}
