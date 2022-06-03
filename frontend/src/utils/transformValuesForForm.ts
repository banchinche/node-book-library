import { Book, BookInitialState } from 'src/types/Book';

export const transformBookValuesForForm = (book: Book): BookInitialState => {
  return {
    name: book.name,
    rate: book.rate,
    year: book.year,
    description: book.description,
    directorid: book.DirectorId ? `${book.DirectorId}` : '',
    genres: book.Genres.map((genre) => genre.id),
  };
};
