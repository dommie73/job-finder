import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { CssBaseline, Container } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Header from "./components/Header";

import Search from "./routes/Search";

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
            <Route
              exact
              path="/scrape"
              render={props => <Search {...props} scraping={true} />}
            />
            <Route
              exact
              path="/search"
              render={props => <Search {...props} scraping={false} />}
            />
          </Switch>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
