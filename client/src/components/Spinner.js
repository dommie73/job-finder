import React from 'react';

import {
  Modal,
  CircularProgress,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
}));

const Spinner = () => {
  const { popup } = useStyles();

  return (
    <Modal open={true}>
      <Paper className={popup}>
        <div>
          <Typography paragraph>
            Fetching data. This may take a while...
          </Typography>
          <CircularProgress />
        </div>
      </Paper>
    </Modal>
  )
};

export default Spinner;