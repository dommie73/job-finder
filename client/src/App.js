import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './routes/Main';

const theme = createMuiTheme({
  spacing: 12
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main} />
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
