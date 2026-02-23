import { useForm } from 'react-hook-form';

interface Filters {
  title: string;
  author: string;
}

interface Props {
  onFilter: (data: Filters) => void;
}

export const FiltersForm = ({ onFilter }: Props) => {
  const { register, handleSubmit, reset } = useForm<Filters>();

  const onSubmit = (data: Filters) => {
    // Відфільтровуємо порожні значення перед відправкою
    onFilter(data);
  };

  const handleReset = () => {
    reset(); // Очищає поля форми в UI
    onFilter({ title: '', author: '' }); // Відправляє пусті фільтри "вгору", щоб оновити список книг
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <p className="text-foreground pt-8 text-sm font-medium">Filters:</p>
      <div className="focus-within:border-foreground flex items-center rounded-xl border border-(--input-border) bg-(--input-bg) px-4 py-3.5">
        <span className="mr-2 text-center text-sm font-medium whitespace-nowrap text-(--text-secondary)">
          Book title:
        </span>
        {/* Інпут Title */}
        <input
          {...register('title')}
          aria-label="Book title"
          autoComplete="title"
          placeholder="Enter text"
          className="placeholder:text-foreground text-foreground w-full border-none bg-transparent p-0 outline-none"
        />
      </div>
      <div className="focus-within:border-foreground flex items-center rounded-xl border border-(--input-border) bg-(--input-bg) px-4 py-3.5">
        {/* Інпут Author */}
        <span className="mr-2 text-center text-sm font-medium whitespace-nowrap text-(--text-secondary)">
          The author:
        </span>
        <input
          {...register('author')}
          aria-label="The author"
          autoComplete="author"
          placeholder="Enter text"
          className="placeholder:text-foreground text-foreground w-full border-none bg-transparent p-0 outline-none"
        />
      </div>
      <div className="mt-5 flex gap-2">
        {/* Кнопка To apply */}
        <button
          type="submit"
          className="text-foreground hover:bg-foreground hover:text-background w-fit rounded-full border border-white/20 px-7 py-3 font-bold transition duration-200 ease-out active:scale-95"
        >
          To apply
        </button>

        {/* Нова кнопка Reset */}
        <button
          type="button" // Важливо! type="button", щоб не спрацьовував сабміт форми
          onClick={handleReset}
          className="hover:text-foreground px-4 py-3 text-sm font-medium text-(--text-secondary) underline transition-colors"
        >
          Reset filters
        </button>
      </div>
    </form>
  );
};
