import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import SearchForm from '../components/SearchForm';
import OffersList from '../components/OffersList';
import Spinner from '../components/Spinner'

import getJobOffers from '../services/job-finder-server';

const Search = () => {

  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);

    const offersData = await getJobOffers(city, category);
    setOffers(offersData);
    setIsLoading(false);
  }

  return (
    <Grid container>
      <Grid item lg={12}>
        <SearchForm
          city={city}
          category={category}
          setCity={setCity}
          setCategory={setCategory}
          handleSubmit={handleSubmit}
        />
      </Grid>
      <Grid item lg={12}>
        {isLoading ?
          <Spinner /> :
          <OffersList offers={offers} />}
      </Grid>
    </Grid>
  );
};

export default Search;
