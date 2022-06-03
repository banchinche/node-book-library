import { useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/storeTypes';
import {
  bookSelector,
  createBook,
  editBook,
  getBook,
  resetSingleBook,
} from 'src/redux/Books/booksSlice';
import { BookInitialState, CreateBookDTO, UpdateBookDTO } from 'src/types/Book';
import { genreListSelector, getGenres } from 'src/redux/Genres/genresSlice';
import {
  directorListSelector,
  getDirectors,
} from 'src/redux/Directors/directorsSlice';
import { transformBookValuesForSubmit } from 'src/utils/transformValuesForSubmit';
import { transformBookValuesForForm } from 'src/utils/transformValuesForForm';
import { Nullable, SelectorValues } from 'src/types/globalTypes';
import {
  transformToSelectOption,
  transformToSelectOptions,
} from 'src/utils/transformToSelectOption';

import { ComboboxMultiple } from 'src/components/layout/ComboboxMultiple';
import { ComboboxSingle } from 'src/components/layout/ComboboxSingle';

const initialState = {
  name: '',
  directorid: '',
  rate: '',
  year: '',
  description: '',
  genres: [],
};

export const SingleBook: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: book, isLoadingBook } = useSelector(bookSelector);
  const { data: directors, isLoading: isLoadingDirectors } =
    useSelector(directorListSelector);
  const { data: genres, isLoading: isLoadingGenres } =
    useSelector(genreListSelector);
  const params = useParams();
  const bookId = params?.id ?? null;
  const [values, setValues] = useState<BookInitialState>(initialState);
  const [selectedGenres, setSelectedGenres] = useState<SelectorValues[]>([]);
  const [selectedDirector, setSelectedDirector] =
    useState<Nullable<SelectorValues>>(null);

  const clearState = () => {
    setValues(initialState);
    setSelectedGenres([]);
    setSelectedDirector(null);
  };

  useEffect(() => {
    if (!!bookId && !book) dispatch(getBook(+bookId));
    if (!!bookId && book) setValues(transformBookValuesForForm(book));
    if (!bookId && book) {
      dispatch(resetSingleBook(book));
      clearState();
    }
    return () => {
      dispatch(resetSingleBook(book));
    };
  }, [bookId, book, dispatch]);

  const handleChange =
    (prop: keyof BookInitialState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  useEffect(() => {
    if (!directors && !isLoadingDirectors) dispatch(getDirectors());
  }, [directors, isLoadingDirectors, dispatch]);

  useEffect(() => {
    if (directors && book?.DirectorId && bookId) {
      const currentBookDirector = directors.find(
        (director) => director.id === book.DirectorId,
      );
      if (currentBookDirector)
        setSelectedDirector(transformToSelectOption(currentBookDirector));
    }
  }, [directors, book, bookId]);
  useEffect(() => {
    if (book?.Genres && bookId) {
      if (book?.Genres?.length > 0)
        setSelectedGenres(transformToSelectOptions(book.Genres));
    }
  }, [book, bookId]);

  useEffect(() => {
    if (!genres && !isLoadingGenres) dispatch(getGenres());
  }, [genres, isLoadingGenres, dispatch]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const { rate, year } = values;
    if (rate !== '' && year !== '') {
      const transformedValues = transformBookValuesForSubmit(
        values,
        selectedGenres,
        selectedDirector,
      );
      if (!bookId) {
        dispatch(createBook(transformedValues as CreateBookDTO));
      } else {
        dispatch(
          editBook({ body: transformedValues as UpdateBookDTO, id: +bookId }),
        );
      }
    }
  };

  if (isLoadingBook) return <CircularProgress />;

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='flex-start'
      style={{ minHeight: '100vh' }}
    >
      <Typography variant='body1' color='text.primary' margin={2}>
        Book
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='name'>Name</InputLabel>

            <OutlinedInput
              id='name'
              type='text'
              value={values.name}
              onChange={handleChange('name')}
              label='Name'
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='description'>Description</InputLabel>

            <OutlinedInput
              id='description'
              type='text'
              value={values.description}
              onChange={handleChange('description')}
              label='Description'
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='year'>Year</InputLabel>

            <OutlinedInput
              id='year'
              type='text'
              value={values.year}
              onChange={handleChange('year')}
              label='year'
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
            <InputLabel htmlFor='rate'>Rate</InputLabel>

            <OutlinedInput
              id='rate'
              type='number'
              value={values.rate}
              onChange={handleChange('rate')}
              label='Rate'
            />
          </FormControl>
        </Grid>
        {genres && (
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
              <ComboboxMultiple
                options={genres}
                tag='genres'
                setValues={setSelectedGenres}
                values={transformToSelectOptions(selectedGenres)}
              />
            </FormControl>
          </Grid>
        )}
        {directors && (
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: 300 }} variant='outlined'>
              <ComboboxSingle
                options={directors}
                tag='directors'
                setValue={setSelectedDirector}
                value={
                  selectedDirector
                    ? transformToSelectOption(selectedDirector)
                    : null
                }
              />
            </FormControl>
          </Grid>
        )}
        <Grid item xs={3}>
          <Button onClick={clearState}>Clear</Button>
          <Button type='submit'>{bookId ? 'Update' : 'Save'}</Button>
        </Grid>
      </form>
    </Grid>
  );
};
