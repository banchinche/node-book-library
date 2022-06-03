import { AxiosResponse } from 'axios';

import { Endpoints } from '../../constants';
import { API } from '../common/HTTPRequest';
import { Book, CreateBookDTO, UpdateBookDTO } from '../../types/Book';

const endpointBase = Endpoints.BOOKS;

export const BookApi = {
  getList: (): Promise<AxiosResponse<Book[]>> => API.get(endpointBase),
  getSingle: (bookId: number) => API.get(`${endpointBase}/${bookId}`),
  create: (body: CreateBookDTO): Promise<AxiosResponse<Book>> =>
    API.post(endpointBase, body),
  edit: (body: UpdateBookDTO, bookId: number): Promise<AxiosResponse<Book>> =>
    API.put(`${endpointBase}/${bookId}`, body),
  delete: (bookId: number): Promise<AxiosResponse<void>> =>
    API.delete(`${endpointBase}/${bookId}`),
};
