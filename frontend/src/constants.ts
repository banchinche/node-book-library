export enum Endpoints {
  USER_HIMSELF = '/users/me',
  USER_BOOKS = '/users/books',
  SINGLE_USER = '/users/:id',
  USERS = '/users',
  SINGLE_DIRECTOR_CREATE = '/directors/create',
  SINGLE_DIRECTOR = '/directors/:id',
  DIRECTORS = '/directors',
  SINGLE_BOOK_CREATE = '/books/create',
  SINGLE_BOOK = '/books/:id',
  BOOKS = '/books',
  SINGLE_GENRE_CREATE = '/genres/create',
  SINGLE_GENRE = '/genres/:id',
  GENRES = '/genres',
  AUTH = '/auth',
  AUTH_SIGNUP = '/signup',
  AUTH_SIGNIN = '/signin',
  MAIN = '/',
}

export const RequestTimeout = 1000;
