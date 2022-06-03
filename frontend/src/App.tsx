import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { RestrictedRoute } from './components/common/RestrictedRoute';
import { Header } from './components/layout/Header';
import { Endpoints } from './constants';
import { Books } from './components/pages/Books';
import { Genres } from './components/pages/Genres';
import { Directors } from './components/pages/Directors';
import { Body } from './components/layout/Body';
import { Auth } from './components/pages/Auth';
import { SingleBook } from './components/pages/SingleBook';
import { SingleGenre } from './components/pages/SingleGenre';
import { SingleDirector } from './components/pages/SingleDirector';
import { UserBooks } from './components/pages/UserBooks';
import { SingleUser } from './components/pages/User';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Body>
        <Routes>
          <Route
            path={Endpoints.USER_HIMSELF}
            element={<RestrictedRoute component={SingleUser} />}
          />
          <Route
            path={Endpoints.USER_BOOKS}
            element={<RestrictedRoute component={UserBooks} />}
          />
          <Route
            path={Endpoints.SINGLE_DIRECTOR_CREATE}
            element={<RestrictedRoute component={SingleDirector} />}
          />
          <Route
            path={Endpoints.SINGLE_DIRECTOR}
            element={<RestrictedRoute component={SingleDirector} />}
          />
          <Route
            path={Endpoints.DIRECTORS}
            element={<RestrictedRoute component={Directors} />}
          />

          <Route
            path={Endpoints.SINGLE_GENRE_CREATE}
            element={<RestrictedRoute component={SingleGenre} />}
          />
          <Route
            path={Endpoints.SINGLE_GENRE}
            element={<RestrictedRoute component={SingleGenre} />}
          />
          <Route
            path={Endpoints.GENRES}
            element={<RestrictedRoute component={Genres} />}
          />
          <Route
            path={Endpoints.SINGLE_BOOK_CREATE}
            element={<RestrictedRoute component={SingleBook} />}
          />
          <Route
            path={Endpoints.SINGLE_BOOK}
            element={<RestrictedRoute component={SingleBook} />}
          />
          <Route
            path={Endpoints.BOOKS}
            element={<RestrictedRoute component={Books} />}
          />
          <Route path={Endpoints.AUTH} element={<Auth />} />
          <Route
            path={Endpoints.MAIN}
            element={<RestrictedRoute component={SingleUser} />}
          />
        </Routes>
      </Body>
    </BrowserRouter>
  );
}

export default App;
