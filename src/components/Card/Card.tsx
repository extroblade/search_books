import { Link } from 'react-router-dom';
import { FC, JSX } from 'react';
import './Card.css';
import { Loader } from '@/components';
import { iBook } from '@/types';

export const Card: FC<{ book: iBook }> = ({ book }): JSX.Element => {
  const { id, volumeInfo } = book;
  const { title, authors, categories, imageLinks } = volumeInfo || {};
  const authorsAsString = authors
    ? authors[0] +
      authors.slice(1, authors.length).reduce((res: string, next: string) => res + `, ${next}`, '')
    : '';
  if (!id) return <Loader />;
  return (
    <div className={'card'}>
      <Link to={`/book/${id}`}>
        <img src={imageLinks?.smallThumbnail || ''} alt={title} />
      </Link>
      <div className={'card__text'}>
        {categories?.length && <p className={'card__category'}>{categories[0]}</p>}
        <h3 className={'card__title'}>{title}</h3>
        <div className={'card__authors'} title={authorsAsString}>
          {authors?.length &&
            authors.map((author) => (
              <span className={'card__author'} key={author}>
                {author}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
