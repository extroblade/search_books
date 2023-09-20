import { useParams } from 'react-router';
import { useFetchBookQuery } from '@/store';
import { JSX, FC } from 'react';
import { Loader, Book } from '@/components';
import './BookPage.css';
export const BookPage: FC = (): JSX.Element => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useFetchBookQuery({ id: id || '' });
  if (isLoading) return <Loader />;
  if (!book || error) return <p>error</p>
  return (
    <div className={'book-page'}>
      <Book book={book} />
    </div>
  );
};
