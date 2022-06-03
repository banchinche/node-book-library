import {
  isPendingAction,
  isFulfilledAction,
  isRejectedAction,
} from 'src/utils/rtk.helpers';
import { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookApi } from '../../api';
import { Book, CreateBookDTO, UpdateBookActionProps } from '../../types/Book';
import { Nullable } from '../../types/globalTypes';
import { RootState } from '../storeTypes';

export interface InitialBooksState {
  data: Nullable<Book[]>;
  isLoading: boolean;
  error: string;
}

export interface InitialBookState {
  data: Nullable<Book>;
  isLoadingBook: boolean;
  bookError: string;
}

export interface InitialState {
  books: InitialBooksState;
  singleBook: InitialBookState;
}

export const bookListInitialState: InitialBooksState = {
  data: null,
  isLoading: false,
  error: '',
};
export const bookInitialState: InitialBookState = {
  data: null,
  isLoadingBook: false,
  bookError: '',
};

export const initialState: InitialState = {
  books: bookListInitialState,

  singleBook: bookInitialState,
};
export const getBooks = createAsyncThunk<AxiosResponse<Book[]>, void>(
  'books/getBooks',
  async () => await BookApi.getList(),
);

export const getBook = createAsyncThunk('books/getBook', async (id: number) => {
  return await BookApi.getSingle(id);
});

export const createBook = createAsyncThunk(
  'books/create',
  async (book: CreateBookDTO) => await BookApi.create(book),
);

export const editBook = createAsyncThunk<
  AxiosResponse<Book>,
  UpdateBookActionProps
>('books/edit', async ({ body, id }) => {
  return await BookApi.edit(body, id);
});

export const deleteBook = createAsyncThunk(
  'books/delete',
  async (bookId: number) => await BookApi.delete(bookId),
);

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSingleBook(state, { payload }: PayloadAction<Nullable<Book>>) {
      state.singleBook.data = payload;
    },
    resetSingleBook(state, { payload }: PayloadAction<Nullable<Book>>) {
      if (payload !== null) {
        state.singleBook = bookInitialState;
      }
    },
    resetBookList(state, { payload }: PayloadAction<Nullable<Book[]>>) {
      if (payload !== null) {
        state.books = bookListInitialState;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.books.error = '';
      state.books.isLoading = true;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.books.data = action.payload.data;
      state.books.error = '';
      state.books.isLoading = false;
    });

    builder.addMatcher(isPendingAction('books/'), (state) => {
      state.singleBook.isLoadingBook = true;
    });
    builder.addMatcher(isRejectedAction('books/'), (state, action) => {
      state.singleBook.bookError = action.error.message ?? '';
      state.singleBook.isLoadingBook = false;
    });
    builder.addMatcher(isFulfilledAction('books/'), (state, action) => {
      const isBookGet = Array.isArray(action.payload.data);
      state.singleBook.data = isBookGet
        ? (action.payload as AxiosResponse<Book[]>).data[0]
        : (action.payload as AxiosResponse<Book>).data;
      state.singleBook.bookError = '';
      state.singleBook.isLoadingBook = false;
    });
  },
});

export const BooksReducer = bookSlice.reducer;
export const { resetSingleBook, setSingleBook, resetBookList } =
  bookSlice.actions;
export const bookSelector = ({ books }: RootState) => books.singleBook;
export const bookListSelector = ({ books }: RootState) => books.books;
