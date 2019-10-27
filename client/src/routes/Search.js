import React from 'react';

import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import OptionsGroup from '../components/OptionsGroup';

import categories from '../data/categories';
import cities from '../data/cities';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
}));

const Search = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item lg={12}>
        <form className={classes.form}>
          <Typography component="h1" variant="h4" gutterBottom>
            Search jobs
          </Typography>
          <OptionsGroup data={cities} legend="Select city" />
          <OptionsGroup data={categories} legend="Select category" />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Search;
