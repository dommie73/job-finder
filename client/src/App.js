import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CssBaseline, Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './routes/Main';
import Search from './routes/Search';

const theme = createMuiTheme({
  spacing: 12
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container component="main">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/search' component={Search} />
          </Switch>
        </BrowserRouter>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
