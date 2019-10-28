import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Typography
} from '@material-ui/core';

import { AttachMoney, Business } from '@material-ui/icons';

const OffersList = ({ offers }) => {
  return (
    <Grid container spacing={5}>
      {offers.map(offer => (
        <Grid item key={offer.url} xs={12} sm={6} md={4}>
          <Card>
            <CardHeader
              title={offer.title}
              subheader={offer.company.name}
            />
            <CardContent>
              <Grid container>
                <Grid item lg={2}>
                  <Business titleAccess="Company address" />
                </Grid>
                <Grid item lg={10}>
                  <Typography>{offer.company.address}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item lg={2}>
                  <AttachMoney titleAccess="Salary" />
                </Grid>
                <Grid item lg={10}>
                  <Typography>{offer.salary}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                color="primary"
                fullWidth
                href={offer.url}
                target="_blank"
                rel="noopener"
                variant="contained"
              >
                See offer on {offer.from}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OffersList;