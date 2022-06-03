import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { BooksReducer } from 'src/redux/Books/booksSlice';
import thunkMiddleware from 'redux-thunk';
import { AuthReducer } from './Auth/authSlice';
import { DirectorsReducer } from './Directors/directorsSlice';
import { GenresReducer } from './Genres/genresSlice';
import { UserReducer } from './User/userSlice';

export const persistor = null;

const rootReducer = combineReducers({
  books: BooksReducer,
  auth: AuthReducer,
  directors: DirectorsReducer,
  genres: GenresReducer,
  user: UserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
