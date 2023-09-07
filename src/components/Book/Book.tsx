import { FC, JSX } from 'react';
import './Book.css';
import { Loader } from '@/components';
import { iBook } from '@/types';
export const Book: FC<{ book: iBook }> = ({ book }): JSX.Element => {
  const { title, authors, description, categories, imageLinks } = book?.volumeInfo || {};

  if (!book) return <Loader />;
  return (
    <>
      <div className={'book__image'}>
        <img src={imageLinks?.thumbnail} alt={title} />
      </div>
      <div>
        <div>
          {categories?.length && (
            <>
              <h3>Categories:</h3>
              <div className={'book__categories'}>
                {categories.map((category: string) => (
                  <p className={'book__category'} key={category}>
                    {category}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>

        <h2>{title}</h2>
        <div>
          {authors?.length && (
            <>
              <h3>authors:</h3>
              <div className={'book__authors'}>
                {authors?.length &&
                  authors.map((author: string[]) => (
                    <span className={'book__author'} key={author}>
                      {author}
                    </span>
                  ))}
              </div>
            </>
          )}
        </div>
        <div>
          {description && (
            <>
              <h3>description:</h3>
              <div
                className={'book__description'}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
