import { Link } from 'react-router-dom';
export const Card = ({ book }) => {
  const { id, volumeInfo } = book;
  const { title, authors, publisher, description, pageCount, categories, imageLinks } =
    volumeInfo || {};

  return (
    <div className={'card'}>
      <Link to={`/book/${id}`}>
        <img src={imageLinks?.smallThumbnail || ''} alt={title} />
      </Link>
      <div className={'card__text'}>
        {categories?.length && <p>{categories[0]}</p>}
        <p>{title}</p>
        <div>{authors?.length && authors.map((author) => <p key={author}>{author}</p>)}</div>
      </div>
    </div>
  );
};
