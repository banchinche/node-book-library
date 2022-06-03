import { AxiosResponse } from 'axios';
import { Book } from 'src/types/Book';

import { Endpoints } from '../../constants';
import { API } from '../common/HTTPRequest';
import {
  User,
  UpdateUserDTO,
  UpdateUserBooksDTO,
  GetUserBooksDTO,
} from '../../types/User';

export const UserApi = {
  getSelf: (): Promise<AxiosResponse<User>> => API.get(Endpoints.USER_HIMSELF),
  editSelf: (body: UpdateUserDTO): Promise<AxiosResponse<User>> =>
    API.put(`${Endpoints.USER_HIMSELF}`, body),
  getMyBooks: (): Promise<AxiosResponse<GetUserBooksDTO>> =>
    API.get(Endpoints.USER_BOOKS),
  editMyBooks: (
    body: UpdateUserBooksDTO,
  ): Promise<AxiosResponse<GetUserBooksDTO>> =>
    API.put(`${Endpoints.USER_BOOKS}`, body),
};
