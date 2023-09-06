import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PAGINATION_LIMIT } from '../consts';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (build) => ({
    fetchBooks: build.query<any, any>({
      query: ({ q, category, sort, limit }) => ({
        url: '/volumes',
        params: {
          q: `${q}${category && category !== 'all' ? `+subject:${category}` : ''}`,
          orderBy: sort || 'relevance',
          maxResults: PAGINATION_LIMIT,
          startIndex: limit - PAGINATION_LIMIT,
          key: import.meta.env.VITE_API_KEY,
        },
      }),
    }),
    fetchBook: build.query<any, any>({
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

const initialState = {
  q: '',
  sort: 'relevance',
  subject: 'all',
  limit: PAGINATION_LIMIT,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQueue(state, action) {
      state.q = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSubject(state, action) {
      state.subject = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
});

export const { setQueue, setSort, setSubject, setLimit } = filtersSlice.actions;
export const selectFilters = (state) => state.filtersReducer;

const rootReducer = combineReducers({
  filtersReducer: filtersSlice.reducer,
  [booksApi.reducerPath]: booksApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware),
});
