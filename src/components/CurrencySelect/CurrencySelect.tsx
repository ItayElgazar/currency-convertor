import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import {
  TextField,
  MenuItem,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core';
import CURRENCY_LIST from '../../common/currencyList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    currencySelect: {
      width: 265
    }
  })
);

type CurrencySelectProps = {
  onCurrencySelected: (currency: string) => void;
  initialCurrency?: string;
  label?: string;
  disabled?: boolean;
};

const CurrencySelect: FC<CurrencySelectProps> = ({
  onCurrencySelected,
  initialCurrency,
  label,
  disabled
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);

  useEffect(() => {
    setSelectedCurrency(initialCurrency);
  }, [initialCurrency]);
  const classes = useStyles();

  const handleCurrencySelect = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(target.value);
    onCurrencySelected(target.value);
  };
  return (
    <TextField
      className={classes.currencySelect}
      select
      label="Select"
      onChange={handleCurrencySelect}
      helperText={label}
      variant="outlined"
      value={selectedCurrency}
      disabled={disabled}
    >
      {CURRENCY_LIST.map(option => (
        <MenuItem key={option.code} value={option.code}>
          {option.name} - {option.code}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CurrencySelect;
