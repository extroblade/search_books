import { useState, useEffect } from 'react';
import { Card } from '@/components';
import { PAGINATION_LIMIT } from '@/consts';
import {
  useAppDispatch,
  useFetchBooksQuery,
  useAppSelector,
  selectFilters,
  setStartIndex,
} from '@/store';
import { iBook } from '@/types';
import { Loader } from '@/components/Loader/Loader.tsx';
import './SearchPage.css';
export const SearchPage = () => {
  const { startIndex, query, sort, category } = useAppSelector(selectFilters);
  const [books, setBooks] = useState<iBook[]>([]);
  const dispatch = useAppDispatch();
  const params = { query, sort, category, startIndex };
  const { data, isFetching, isLoading, error } = useFetchBooksQuery(params);

  useEffect(() => {
    if (!data?.items || isFetching) {
      return;
    }
    if (!startIndex) {
      setBooks(() => data?.items);
      return;
    }
    setBooks(() => [...books, ...data.items]);
  }, [data, startIndex, isFetching]);

  useEffect(() => {
    dispatch(setStartIndex(0));
  }, [query, sort, category, dispatch]);
  const loadHandle = () => {
    dispatch(setStartIndex(startIndex + PAGINATION_LIMIT));
  };

  if (!query) return <h1>enter query</h1>;
  if ((!isFetching && !data?.totalItems) || error) return <h1>nothing found</h1>;
  return (
    <div className={'search-page__results'}>
      {!isFetching && data?.totalItems && <h2> found {data?.totalItems} results:</h2>}
      {isFetching && <Loader />}
      {data && (
        <div className={'grid'}>
          {books?.length &&
            books.map((book: iBook) => <Card book={book} key={book.id + book.etag} />)}
        </div>
      )}
      {isFetching && books?.length ? <Loader /> : ''}
      {!isFetching && data?.totalItems >= startIndex + PAGINATION_LIMIT && (
        <button disabled={isLoading} onClick={loadHandle}>
          load more
        </button>
      )}
    </div>
  );
};
