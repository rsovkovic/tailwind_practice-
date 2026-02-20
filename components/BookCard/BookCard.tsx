// import { ResultBook } from '@/app/api/books';

// import Image from 'next/image';
// import Link from 'next/link';

// interface Props {
//   book: ResultBook;
// }

// export default function BookCard({ book }: Props) {
//   return (
//     <Link href={'/'}>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//         <div key={book._id} className="rounded-lg border p-4 shadow-sm">
//           <div className="relative mb-4 h-72 w-full">
//             <Image
//               src={book.imageUrl || 'https://placehold.co'}
//               alt={book.title}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               className="rounded-lg object-cover"
//             />
//           </div>
//           <h2 className="font-bold">{book.title}</h2>
//           <p className="text-sm text-gray-500">{book.author}</p>
//           <div className="mt-2 inline-block rounded bg-blue-100 px-2 py-1 text-xs">
//             {book.totalPages} pages.
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

import { ResultBook } from '@/app/api/books';
import Image from 'next/image';

interface Props {
  book: ResultBook;
  index: number;
  onClick?: () => void; // Додаємо проп для кліку (відкриття модалки)
}

export default function BookCard({ book, index, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="w-full max-w-34.25 cursor-pointer sm:max-w-47.5" // Обмежуємо ширину згідно з макетом
    >
      {/* Контейнер для зображення */}
      <div className="relative mb-2 h-53.25 w-full overflow-hidden rounded-lg sm:h-70">
        <Image
          src={book.imageUrl || '/default-book.png'} // Краще мати своє дефолтне фото в public
          alt={book.title}
          fill
          sizes="(max-width: 768px) 137px, 190px"
          priority={index < 5}
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Інформація про книгу */}
      <div className="space-y-1">
        <h2 className="truncate text-sm font-bold text-white sm:text-base">
          {book.title}
        </h2>
        <p className="truncate text-xs text-[#686868] sm:text-sm">
          {book.author}
        </p>
      </div>
    </div>
  );
}
