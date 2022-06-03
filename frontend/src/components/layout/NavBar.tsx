import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Book as BookIcon,
  Create,
  List,
  Man,
  Update,
} from '@mui/icons-material';
import { Endpoints } from 'src/constants';
import { NavLink, useLocation } from 'react-router-dom';
import { Nullable } from 'src/types/globalTypes';

export const labelIconPaths = [
  { key: 0, label: 'Book List', to: Endpoints.BOOKS, icon: <BookIcon /> },
  {
    key: 1,
    label: 'Book Create',
    to: Endpoints.SINGLE_BOOK_CREATE,
    icon: <Create />,
  },
  {
    key: 2,
    label: 'Book Update',
    to: Endpoints.SINGLE_BOOK,
    icon: <Update />,
    disabled: true,
  },
  { key: 3, label: 'Genre List', to: Endpoints.GENRES, icon: <List /> },
  {
    key: 4,
    label: 'Genre Create',
    to: Endpoints.SINGLE_GENRE_CREATE,
    icon: <Create />,
  },
  {
    key: 5,
    label: 'Genre Update',
    to: Endpoints.SINGLE_GENRE,
    icon: <Update />,
    disabled: true,
  },
  { key: 6, label: 'Director List', to: Endpoints.DIRECTORS, icon: <Man /> },
  {
    key: 7,
    label: 'Director Create',
    to: Endpoints.SINGLE_DIRECTOR_CREATE,
    icon: <Create />,
  },
  {
    key: 8,
    label: 'Director Update',
    to: Endpoints.SINGLE_DIRECTOR,
    icon: <Update />,
    disabled: true,
  },
  {
    key: 9,
    label: 'Me',
    to: Endpoints.USER_HIMSELF,
    icon: <Update />,
  },
  {
    key: 10,
    label: 'My Books',
    to: Endpoints.USER_BOOKS,
    icon: <List />,
  },
];

export const NavBar = () => {
  const [navValue, setNavValue] = useState<Nullable<number>>(null);
  const location = useLocation();

  useEffect(() => {
    if (!navValue || location.pathname !== labelIconPaths[navValue].to) {
      const newRedirectKey = labelIconPaths.find((LIP) => {
        const isUpdateRoute = (location.pathname.match(/\//g) || []).length > 1;

        const locationRoute = location.pathname.substr(
          0,
          location.pathname.lastIndexOf('/'),
        );

        return isUpdateRoute
          ? LIP.to === `${locationRoute}/:id`
          : LIP.to === location.pathname;
      })?.key;
      if (newRedirectKey !== undefined) setNavValue(newRedirectKey ?? null);
    }
  }, [location.pathname, navValue]);

  return (
    <AppBar position='fixed' color='primary' style={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={(event, newValue) => {
          setNavValue(newValue);
        }}
      >
        {labelIconPaths.map((LIP) => (
          <BottomNavigationAction component={NavLink} {...LIP} />
        ))}
      </BottomNavigation>
    </AppBar>
  );
};
