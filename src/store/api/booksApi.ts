import { iBook, iBooks, iFilters } from '@/types';
import { PAGINATION_LIMIT } from '@/consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (build) => ({
    fetchBooks: build.query<iBooks, Omit<iFilters, 'id'>>({
      query: ({ query, category, sort, startIndex }) => ({
        url: '/volumes',
        params: {
          q: `${query}${category && category !== 'all' ? `+subject:${category}` : ''}`,
          orderBy: sort,
          maxResults: PAGINATION_LIMIT,
          startIndex: startIndex,
          key: import.meta.env.VITE_API_KEY,
        },
      }),
    }),
    fetchBook: build.query<iBook, Pick<iFilters, 'id'>>({
      query: ({ id }) => ({
        url: `/volumes/${id}`,
        params: {
          key: import.meta.env.VITE_API_KEY,
        },
      }),
    }),
  }),
});

export const { useFetchBooksQuery, useFetchBookQuery } = booksApi;
