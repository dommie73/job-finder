import React from 'react';

import { Button, Typography } from '@material-ui/core';
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

const SearchForm = props => {
  const classes = useStyles();
  const {
    city,
    setCity,
    category,
    setCategory,
    handleSubmit
  } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography component="h1" variant="h4" gutterBottom>
        Search jobs
    </Typography>
      <OptionsGroup
        data={cities}
        value={city}
        setValue={setCity}
        legend="Select city" />
      <OptionsGroup
        data={categories}
        value={category}
        setValue={setCategory}
        legend="Select category" />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Search
    </Button>
    </form>
  );
}

export default SearchForm;