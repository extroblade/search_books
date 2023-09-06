import { FC, JSX, ChangeEvent, useRef, useState } from 'react';
import { categories, sorts } from '../consts';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setQueue, setSort, setSubject } from '../store';
export const Header: FC = (): JSX.Element => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sort, setSortValue] = useState(sorts[0]);
  const [category, setCategoryValue] = useState(categories[0]);

  const handleSubmit = (e: ChangeEvent<FormDataEvent>) => {
    e.preventDefault();
    dispatch(setQueue(inputRef.current.value));
    navigate('/');
  };

  const changeSort = (e) => {
    e.preventDefault();
    setSortValue(() => e.target.value);
    dispatch(setSort(e.target.value));
  };
  const changeCategory = (e) => {
    e.preventDefault();
    setCategoryValue(() => e.target.value);
    dispatch(setSubject(e.target.value));
  };

  return (
    <header>
      <Link to={'/'}>
        <h1>search for books</h1>
      </Link>
      <div className={'search__panel'}>
        <form onSubmit={handleSubmit}>
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
        <select value={sort} onChange={changeSort} name="sort" id="sort">
          {sorts.map((sort) => (
            <option key={sort} value={sort}>
              {sort}
            </option>
          ))}
        </select>
        <select defaultValue={category} onChange={changeCategory} name="category" id="category">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
