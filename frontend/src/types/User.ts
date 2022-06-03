import { Book, UpdateBookDTO } from './Book';

export interface User {
  email: string;
  password: string;
}

export interface UpdateUserDTO extends User {}

export interface UpdateUserActionProps {
  body: UpdateUserDTO;
}

export interface UserInitialState {
  email: string;
  password: string;
}

export interface UserBooks {
  books: Book[];
}

export type UserBookDTO = number;

export interface UpdateUserBooksDTO {
  books: UserBookDTO[];
}

export interface UpdateUserBooksActionProps {
  body: UpdateUserBooksDTO;
}

export interface GetSingleUserBookDTO {
  DirectorId: number;
  UserBook: {
    BookId: number;
    UserId: number;
    createdAt: string;
    updatedAt: string;
    id: number;
  };
  description: string;
  id: number;
  name: string;
  rate: number;
  year: number;
}

export interface GetUserBooksDTO {
  id: number;
  password: number;
  email: string;
  updatedAt: string;
  createdAt: string;
  Books: GetSingleUserBookDTO[];
}
