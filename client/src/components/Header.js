import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography component="div" variant="h6">
          Job Finder
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
