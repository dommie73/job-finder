import React from 'react';
import { Link, Typography } from '@material-ui/core';

const Footer = () => {
  return (
    <Typography variant="body2" align="center" component="footer">
      {'Copyright © '}
      <Link href="#" rel="author">
        dommie73
      </Link>
      {` ${new Date().getFullYear()}`}
    </Typography>
  );
};


export default Footer;
