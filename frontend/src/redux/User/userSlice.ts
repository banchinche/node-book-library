import { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  GetUserBooksDTO,
  UpdateUserActionProps,
  UpdateUserBooksActionProps,
  User,
} from 'src/types/User';
import { Book } from 'src/types/Book';
import { UserApi } from 'src/api';

import { Nullable } from '../../types/globalTypes';
import { RootState } from '../storeTypes';

export interface InitialUserState {
  data: Nullable<User>;
  isLoading: boolean;
  error: string;
}

export interface InitialUserBooksState {
  data: Nullable<number[]>;
  isLoading: boolean;
  error: string;
}

export interface InitialState {
  user: InitialUserState;
  userBooks: InitialUserBooksState;
}

export const userInitialState: InitialUserState = {
  data: null,
  isLoading: false,
  error: '',
};
export const userBooksInitialState: InitialUserBooksState = {
  data: null,
  isLoading: false,
  error: '',
};

export const initialState: InitialState = {
  user: userInitialState,

  userBooks: userBooksInitialState,
};
export const getUser = createAsyncThunk<AxiosResponse<User>, void>(
  'user/get',
  async () => await UserApi.getSelf(),
);
export const editUser = createAsyncThunk<
  AxiosResponse<User>,
  UpdateUserActionProps
>('user/edit', async ({ body }) => await UserApi.editSelf(body));

export const getUserBooks = createAsyncThunk<
  AxiosResponse<GetUserBooksDTO>,
  void
>('user/getBooks', async () => await UserApi.getMyBooks());
export const editUserBooks = createAsyncThunk<
  AxiosResponse<GetUserBooksDTO>,
  UpdateUserBooksActionProps
>('user/editBooks', async ({ body }) => await UserApi.editMyBooks(body));

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser(state, { payload }: PayloadAction<Nullable<User>>) {
      if (payload !== null) {
        state.user = userInitialState;
      }
    },
    resetUserBooks(state, { payload }: PayloadAction<Nullable<number[]>>) {
      if (payload !== null) {
        state.userBooks = userBooksInitialState;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.user.error = '';
      state.user.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user.data = action.payload.data;
      state.user.error = '';
      state.user.isLoading = false;
    });
    builder.addCase(editUser.pending, (state) => {
      state.user.error = '';
      state.user.isLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.user.data = action.payload.data;
      state.user.error = '';
      state.user.isLoading = false;
    });
    builder.addCase(getUserBooks.pending, (state) => {
      state.userBooks.error = '';
      state.userBooks.isLoading = true;
    });
    builder.addCase(getUserBooks.fulfilled, (state, action) => {
      state.userBooks.data = action.payload.data.Books.map(
        (book) => book.UserBook.BookId,
      );
      state.userBooks.error = '';
      state.userBooks.isLoading = false;
    });
    builder.addCase(editUserBooks.pending, (state) => {
      state.userBooks.error = '';
      state.userBooks.isLoading = true;
    });
    builder.addCase(editUserBooks.fulfilled, (state, action) => {
      state.userBooks.data = action.payload.data.Books.map(
        (book) => book.UserBook.BookId,
      );
      state.userBooks.error = '';
      state.userBooks.isLoading = false;
    });
  },
});

export const UserReducer = userSlice.reducer;
export const { resetUser, resetUserBooks } = userSlice.actions;
export const userSelector = ({ user }: RootState) => user.user;
export const userBooksSelector = ({ user }: RootState) => user.userBooks;
