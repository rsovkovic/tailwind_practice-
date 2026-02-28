'use client';
import AddBookForm from '@/components/Dashboard/AddBookForm';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import MyBooksList from '@/components/MyBooksList/MyBooksList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addNewBook,
  AddNewBookRequest,
  BooksResponse,
  RemoveBookById,
} from '@/app/api/books';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import RecommendedPreview from '@/components/Dashboard/RecommendedPreview';

export default function MyLibraryPage() {
  const queryClient = useQueryClient();

  // const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { mutate, isPending } = useMutation<
    BooksResponse,
    AxiosError<{ message: string }>,
    AddNewBookRequest
  >({
    mutationFn: addNewBook,
    onSuccess: (data: BooksResponse) => {
      // Оновлюємо кеш списку книг, щоб нова книга з'явилася відразу
      queryClient.invalidateQueries({ queryKey: ['user-books'] });

      // ТЗ: Відкрити модальне вікно про успіх
      // console.log('Книга додана:', newBook);
      // setIsSuccessModalOpen(true);

      toast.success(`Book "${data.title}" added!`);
    },
    onError: (error) => {
      // ТЗ: Обробити помилку і показати нотифікацію
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    },
  });

  const handleAddBook = (data: AddNewBookRequest) => {
    mutate(data);
  };
  const { mutate: deleteBook } = useMutation({
    mutationFn: (id: string) => RemoveBookById(id), // Твоя функція з api
    onSuccess: () => {
      // Оновлюємо список після видалення
      queryClient.invalidateQueries({ queryKey: ['user-books'] });
      toast.success('Book deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete book');
    },
  });

  return (
    <section>
      <div className="container">
        <div className="mt-4 mb-8 flex flex-col items-start gap-4 lg:flex-row">
          <Dashboard>
            <AddBookForm onAddBook={handleAddBook} isLoading={isPending} />
            <RecommendedPreview />
          </Dashboard>
          <div className="bg-secondary-bg size-[stretch] flex-1 rounded-[30px] p-5 lg:p-10">
            <MyBooksList onDeleteBook={deleteBook} />
          </div>
        </div>
      </div>
    </section>
  );
}
