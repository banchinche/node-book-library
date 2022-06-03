import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/storeTypes';

import {
  Grid,
  Card,
  CircularProgress,
  CardHeader,
  Typography,
  CardContent,
  Menu,
  MenuItem,
  Link,
  FormControl,
  Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Director } from 'src/types/Director';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router';
import { Endpoints } from 'src/constants';
import {
  directorListSelector,
  getDirectors,
} from 'src/redux/Directors/directorsSlice';
import { Book } from 'src/types/Book';
import {
  bookListSelector,
  deleteBook,
  getBooks,
  resetBookList,
} from 'src/redux/Books/booksSlice';
import {
  editUserBooks,
  getUserBooks,
  resetUserBooks,
  userBooksSelector,
} from 'src/redux/User/userSlice';
import { Nullable } from 'src/types/globalTypes';
import { UpdateUserBooksDTO } from 'src/types/User';
import { transformUserBooksValuesForSubmit } from 'src/utils/transformValuesForSubmit';

import { ComboboxMultiple } from '../layout/ComboboxMultiple';

const BookCard = ({
  book,
  books,
  directorName,
}: {
  book: Book;
  books: Nullable<Book[]>;
  directorName?: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editItem = () => {
    navigate(`${Endpoints.BOOKS}/${book.id}`);
  };
  const deleteItem = async () => {
    await dispatch(deleteBook(book.id));
    dispatch(resetBookList(books));
  };

  return (
    <Card variant='outlined' key={book.id} sx={{ m: 2 }}>
      <CardHeader
        action={
          <>
            <IconButton aria-label='settings' onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              onClose={handleClose}
              open={open}
            >
              <MenuItem onClick={editItem}>Edit</MenuItem>
              <MenuItem onClick={deleteItem}>Delete</MenuItem>
            </Menu>
          </>
        }
        title={book.name}
        subheader={book.year}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          Description: {book.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Rate: {book.rate}
        </Typography>
        {directorName && (
          <Typography variant='body2' color='text.secondary'>
            Director:{' '}
            <Link
              component={NavLink}
              to={`${Endpoints.DIRECTORS}/${book.DirectorId}`}
              color='primary'
            >
              {directorName}
            </Link>
          </Typography>
        )}
        {book.Genres && (
          <Typography variant='body2' color='text.secondary'>
            Genres:{' '}
            {book.Genres.map((bookGenre, index) => (
              <>
                <Link
                  key={bookGenre.id}
                  component={NavLink}
                  to={`${Endpoints.GENRES}/${bookGenre.id}`}
                  color='primary'
                >
                  {bookGenre.name}
                </Link>
                {book.Genres.length - 1 !== index && <i>, </i>}
              </>
            ))}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export const UserBooks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: books, isLoading } = useSelector(bookListSelector);
  const { data: myBooks, isLoading: isMyBooksLoading } =
    useSelector(userBooksSelector);
  const { data: directors, isLoading: isLoadingDirectors } =
    useSelector(directorListSelector);

  const [selectedUserBooks, setSelectedUserBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!books && !isLoading) dispatch(getBooks());
    return () => {
      dispatch(resetBookList(books));
    };
  }, [books, isLoading, dispatch]);

  useEffect(() => {
    if (!myBooks && !isMyBooksLoading) dispatch(getUserBooks());
    if (myBooks && books)
      setSelectedUserBooks(
        books.filter((book) => myBooks.some((myBook) => myBook === book.id)),
      );
  }, [myBooks, isMyBooksLoading, dispatch, books]);

  useEffect(() => {
    if (!directors && !isLoadingDirectors) dispatch(getDirectors());
  }, [directors, isLoadingDirectors, dispatch]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const transformedUserBooks = selectedUserBooks.map((selectedUserBook) =>
      transformUserBooksValuesForSubmit(selectedUserBook),
    );
    dispatch(
      editUserBooks({
        body: { books: transformedUserBooks } as UpdateUserBooksDTO,
      }),
    );
  };

  if (isLoading || isLoadingDirectors || isMyBooksLoading)
    return <CircularProgress />;

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='flex-start'
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Typography variant='body1' color='text.primary' margin={2}>
          Select My Books
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
              <ComboboxMultiple
                options={books ?? []}
                tag='books'
                setValues={setSelectedUserBooks}
                values={selectedUserBooks}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => setSelectedUserBooks([])}>Clear</Button>
            <Button type='submit'>Update</Button>
          </Grid>
        </form>
      </Grid>
      <Grid container direction='row'>
        {selectedUserBooks?.map((book: Book) => {
          const directorName = directors?.find(
            (director: Director) => book.DirectorId === director.id,
          )?.name;

          return (
            <BookCard
              directorName={directorName}
              book={book}
              books={selectedUserBooks}
            />
          );
        })}{' '}
      </Grid>
    </Grid>
  );
};
