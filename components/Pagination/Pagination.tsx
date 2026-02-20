// import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  total: number;
  page: number;
  onChange: (nextPage: number) => void;
  isLoading?: boolean;
}
export default function Pagination({
  page,
  total,
  onChange,
  isLoading,
}: PaginationProps) {
  return (
    <nav className="flex gap-1">
      <button
        type="button"
        className="rounded-full border border-gray-600 p-2 transition-all disabled:cursor-not-allowed disabled:opacity-20"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1 || isLoading}
        aria-label="Previous page"
      >
        <svg width="40" height="40" className="fill-none stroke-white">
          <use href="/sprite.svg#icon-chevron-left" />
        </svg>
        {/* <ChevronLeft size={40} /> */}
      </button>
      <button
        type="button"
        className="rounded-full border border-gray-600 p-2 text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:border-gray-700 disabled:opacity-20 disabled:hover:bg-transparent"
        onClick={() => onChange(page + 1)}
        disabled={page >= total || isLoading}
      >
        {/* <ChevronRight size={40} /> */}
        <svg width="40" height="40" className="fill-none stroke-white">
          <use href="/sprite.svg#icon-chevron-right" />
        </svg>
      </button>
    </nav>
  );
}
