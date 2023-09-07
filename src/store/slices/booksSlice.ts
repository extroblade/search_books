import { iFilters } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Omit<iFilters, 'id'> = {
  query: '',
  sort: 'relevance',
  category: 'all',
  startIndex: 0,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setStartIndex(state, action: PayloadAction<number>) {
      state.startIndex = action.payload;
    },
  },
});

export const { setQuery, setSort, setCategory, setStartIndex } = filtersSlice.actions;
export const selectFilters = (state) => state.filtersReducer;
export default filtersSlice;
