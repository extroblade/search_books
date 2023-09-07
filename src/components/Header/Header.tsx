import { FC, JSX, ChangeEvent, useRef, useState, FormEvent } from 'react';
import { categories, sorts } from '@/consts';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, setQuery, setSort, setCategory } from '@/store';
import { SortVariants } from '@/types';
import './Header.css';

export const Header: FC = (): JSX.Element => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sort, setSortValue] = useState<SortVariants>(sorts[0]);
  const [category, setCategoryValue] = useState(categories[0]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setQuery(inputRef.current.value));
    navigate('/');
  };

  const changeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setSortValue(() => newValue);
    dispatch(setSort(newValue));
  };
  const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setCategoryValue(() => newValue);
    dispatch(setCategory(newValue));
  };

  return (
    <header className={'header'}>
      <Link to={'/'}>
        <h1>Search for books</h1>
      </Link>
      <div className={'search__panel'}>
        <h4>query:</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <input required type="text" ref={inputRef} />
            <button type={'submit'} className={'search__button'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 50 50"
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
              </svg>
            </button>
          </label>
        </form>
        <div className={'selects'}>
          <div className={'select'}>
            <h4>sort by:</h4>
            <select value={sort} onChange={changeSort} name="sort" id="sort">
              {sorts.map((sort: SortVariants) => (
                <option key={sort} value={sort}>
                  {sort}
                </option>
              ))}
            </select>
          </div>
          <div className={'select'}>
            <h4>category:</h4>
            <select value={category} onChange={changeCategory} name="category" id="category">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
