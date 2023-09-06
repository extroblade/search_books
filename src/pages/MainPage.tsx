import { useState, useEffect } from 'react';
import { Card } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setLimit, useFetchBooksQuery } from '../store';
import { PAGINATION_LIMIT } from '../consts';
export const MainPage = () => {
  const { limit, q, sort, subject } = useSelector(selectFilters);
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const params = { q, sort, category: subject, limit };
  const { data, isFetching, isLoading, isSuccess } = useFetchBooksQuery(params);

  useEffect(() => {
    if (!data?.items || isFetching) {
      return;
    }
    if (limit == PAGINATION_LIMIT) {
      setBooks(() => data?.items);
      return;
    }
    setBooks(() => [...books, ...data?.items]);
  }, [data, limit, isFetching]);

  useEffect(() => {
    dispatch(setLimit(PAGINATION_LIMIT));
  }, [q, sort, subject]);
  const loadHandle = () => {
    dispatch(setLimit(PAGINATION_LIMIT + limit));
  };

  if (!q) return <h1>enter query</h1>;
  if (isFetching) return <h1>Loading...</h1>;
  if (!isFetching && !data?.totalItems) return <h1>nothing found</h1>;
  return (
    <div className={'results'}>
      {isSuccess && data?.totalItems && <h2> found {data?.totalItems} results:</h2>}
      {data && (
        <div className={'grid'}>
          {books?.length && books.map((book) => <Card book={book} key={book.id + book.etag} />)}
        </div>
      )}
      {!isFetching && data?.totalItems >= limit + PAGINATION_LIMIT && (
        <button disabled={isLoading} onClick={loadHandle}>
          load more
        </button>
      )}
    </div>
  );
};
