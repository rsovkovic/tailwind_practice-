import { AddNewBookRequest } from '@/app/api/books';
import { addBookSchema } from '@/utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface Props {
  onAddBook: (data: AddNewBookRequest) => void;
  isLoading?: boolean;
}

export default function AddBookForm({ onAddBook, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNewBookRequest>({
    resolver: yupResolver(addBookSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: AddNewBookRequest) => {
    onAddBook(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <p className="text-foreground text-sm font-medium lg:pt-8">
        Create your library:
      </p>
      <div className="flex flex-col gap-1">
        <div
          className={`focus-within:border-foreground ${errors.title ? 'border-(--error-red)' : 'border-(--input-border)'} flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5`}
        >
          <span className="mr-2 text-center text-sm font-medium whitespace-nowrap text-(--text-secondary)">
            Book title:
          </span>
          <input
            {...register('title')}
            type="text"
            aria-label="Book title"
            autoComplete="off"
            placeholder="Enter text"
            className="placeholder:text-foreground text-foreground w-full border-none bg-transparent p-0 outline-none"
          />
        </div>
        {errors.title && (
          <p className="ml-2 text-[10px] text-(--error-red)">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={`focus-within:border-foreground flex items-center rounded-xl border ${errors.author ? 'border-(--error-red)' : 'border-(--input-border)'} bg-(--input-bg) px-4 py-3.5`}
        >
          <span className="mr-2 text-center text-sm font-medium whitespace-nowrap text-(--text-secondary)">
            The author:
          </span>
          <input
            {...register('author')}
            type="text"
            aria-label="The author"
            autoComplete="off"
            placeholder="Enter text"
            className="placeholder:text-foreground text-foreground w-full border-none bg-transparent p-0 outline-none"
          />
        </div>
        {errors.author && (
          <p className="ml-2 text-[10px] text-(--error-red)">
            {errors.author.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div
          className={`focus-within:border-foreground flex items-center rounded-xl border ${errors.totalPages ? 'border-(--error-red)' : 'border-(--input-border)'} bg-(--input-bg) px-4 py-3.5`}
        >
          <span className="mr-2 text-center text-sm font-medium whitespace-nowrap text-(--text-secondary)">
            Number of pages:
          </span>
          <input
            {...register('totalPages')}
            type="number"
            aria-label="Number of pages"
            autoComplete="off"
            placeholder="0"
            className="placeholder:text-foreground text-foreground w-full border-none bg-transparent p-0 outline-none"
          />
        </div>
        {errors.totalPages && (
          <p className="ml-2 text-[10px] text-(--error-red)">
            {errors.totalPages.message}
          </p>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="text-foreground hover:bg-foreground hover:text-background w-fit rounded-full border border-white/20 px-7 py-3 font-bold transition duration-200 ease-out active:scale-95"
        >
          {isLoading ? 'Adding...' : 'Add book'}
        </button>
      </div>
    </form>
  );
}
