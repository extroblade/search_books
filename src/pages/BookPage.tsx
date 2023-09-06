import { useParams } from 'react-router';
import { useFetchBookQuery } from '../store';
export const BookPage = () => {
  const { id } = useParams();
  const { data: book } = useFetchBookQuery({ id: id });

  const { title, authors, description, categories, imageLinks } = book?.volumeInfo || {};

  return (
    <div className={'book-page'}>
      <div className={'book-page__image'}>
        <img src={imageLinks?.thumbnail} alt={title} />
      </div>
      <div>
        <div>
          {categories?.length && categories.map((category) => <p key={category}>{category}</p>)}
        </div>
        <p>{title}</p>
        <div>{authors?.length && authors.map((author) => <p key={author}>{author}</p>)}</div>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};
