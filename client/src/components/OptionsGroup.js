import React from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  row: {
    flexFlow: 'row wrap',
    justifyContent: 'center'
  },
  fieldset: {
    margin: `${theme.spacing(3)}px 0`
  }
}));

const OptionsGroup = ({ data, legend, value, setValue }) => {
  const classes = useStyles();

  const mappedRadios = data.map(({ label, name }) => (
    <FormControlLabel
      control={<Radio value={name} />}
      key={name}
      label={label}
    />
  ));

  const handleChange = event => {
    setValue(event.target.value);
  }

  return (
    <FormControl component="fieldset" className={classes.fieldset}>
      <FormLabel component="legend">
        {legend}
      </FormLabel>
      <RadioGroup className={classes.row} value={value} onChange={handleChange}>
        {mappedRadios}
      </RadioGroup>
    </FormControl>
  );
};

export default OptionsGroup;