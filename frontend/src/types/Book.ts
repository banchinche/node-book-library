import { Genre } from './Genre';
import { Nullable } from './globalTypes';

export interface Book {
  id: number;
  name: string;
  rate: number;
  year: string;
  description: string;
  DirectorId: Nullable<number>;
  Genres: Genre[];
}
export interface CreateBookDTO {
  name: string;
  rate: number;
  year: string;
  description: string;
  directorid: Nullable<number>;
  genres: number[];
}

export interface UpdateBookDTO extends CreateBookDTO {}
export interface GetBookDTO extends Book {}

export interface UpdateBookActionProps {
  body: UpdateBookDTO;
  id: number;
}

export interface BookInitialState {
  name: string;
  directorid: number | string;
  rate: number | string;
  year: number | string;
  description: string;
  genres: number[];
}
