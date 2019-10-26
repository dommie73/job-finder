import React, { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

const SearchLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to='/search' {...props} />
));

const Main = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item lg={12}>
        <article className={classes.hero}>
          <Typography component="h1" variant="h3" gutterBottom>
            Welcome to job finder!
          </Typography>
          <Typography variant="subtitle2" paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse nostrum veritatis ducimus omnis nihil! Incidunt minus porro deleniti adipisci obcaecati dicta, neque velit libero magnam, delectus perspiciatis? Animi, inventore ex?
          </Typography>
          <Button variant="contained" color="primary" component={SearchLink}>Ok, I'm in!</Button>
        </article>
      </Grid>
    </Grid>
  );
}

export default Main;
