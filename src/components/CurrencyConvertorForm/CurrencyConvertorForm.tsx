import React, { FC, ChangeEvent } from 'react';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import {
  TextField,
  makeStyles,
  Theme,
  createStyles,
  IconButton
} from '@material-ui/core';
import { SwapHoriz } from '@material-ui/icons';

type CurrencyConvertorFormProps = {
  onToCurrencyChange: (toCurrency: string) => void;
  onSwap: () => void;
  onFromCurrencyChange: (fromCurrency: string) => void;
  onAmountChange: (amount: ChangeEvent<HTMLInputElement>) => void;
  fromCurrency?: string;
  toCurrency?: string;
  amount: number;
  disabled?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          marginLeft: 0
        }
      }
    },
    swap: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  })
);

const CurrencyConvertorForm: FC<CurrencyConvertorFormProps> = ({
  onToCurrencyChange,
  onFromCurrencyChange,
  onAmountChange,
  onSwap,
  fromCurrency,
  toCurrency,
  amount,
  disabled
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        label="Amount"
        defaultValue={amount}
        variant="outlined"
        type="number"
        onChange={onAmountChange}
        disabled={disabled}
      />

      <CurrencySelect
        label="From"
        initialCurrency={fromCurrency}
        onCurrencySelected={onFromCurrencyChange}
        disabled={disabled}
      />
      <IconButton
        className={classes.swap}
        color="primary"
        aria-label="Swap"
        component="span"
        onClick={onSwap}
        disabled={disabled}
      >
        <SwapHoriz />
      </IconButton>

      <CurrencySelect
        label="To"
        initialCurrency={toCurrency}
        onCurrencySelected={onToCurrencyChange}
        disabled={disabled}
      />
    </div>
  );
};

export default CurrencyConvertorForm;
