import {CategoryVariants, iFilters, SortVariants} from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "@/store";

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
    setSort(state, action: PayloadAction<SortVariants>) {
      state.sort = action.payload;
    },
    setCategory(state, action: PayloadAction<CategoryVariants>) {
      state.category = action.payload;
    },
    setStartIndex(state, action: PayloadAction<number>) {
      state.startIndex = action.payload;
    },
  },
});

export const { setQuery, setSort, setCategory, setStartIndex } = filtersSlice.actions;
export const selectFilters = (state: RootState) => state.filtersReducer;
export default filtersSlice;
