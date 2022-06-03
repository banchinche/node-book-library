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
import { Nullable } from 'src/types/globalTypes';

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

export const Books: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: books, isLoading } = useSelector(bookListSelector);
  const { data: directors, isLoading: isLoadingDirectors } =
    useSelector(directorListSelector);

  useEffect(() => {
    if (!books && !isLoading) dispatch(getBooks());
    return () => {
      dispatch(resetBookList(books));
    };
  }, [books, isLoading, dispatch]);

  useEffect(() => {
    if (!directors && !isLoadingDirectors) dispatch(getDirectors());
  }, [directors, isLoadingDirectors, dispatch]);

  if (isLoading || isLoadingDirectors) return <CircularProgress />;

  return (
    <Grid container>
      {books?.map((book: Book) => {
        const directorName = directors?.find(
          (director: Director) => book.DirectorId === director.id,
        )?.name;

        return (
          <BookCard directorName={directorName} book={book} books={books} />
        );
      })}
    </Grid>
  );
};
