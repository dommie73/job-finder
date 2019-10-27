import React, { useState } from 'react';

import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import OptionsGroup from '../components/OptionsGroup';
import OffersList from '../components/OffersList';

import categories from '../data/categories';
import cities from '../data/cities';
import getJobOffers from '../services/job-finder-server';

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

  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [offers, setOffers] = useState([]);

  const handleSubmit = async event => {
    event.preventDefault();

    const offersData = await getJobOffers(city, category);
    console.log(offersData);
    setOffers(offersData);
  }

  return (
    <Grid container>
      <Grid item lg={12}>
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
      </Grid>
      <Grid item lg={12}>
        <OffersList offers={offers} />
      </Grid>
    </Grid>
  );
};

export default Search;
