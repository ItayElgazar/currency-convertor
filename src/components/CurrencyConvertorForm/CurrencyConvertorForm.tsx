import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import { ConvertEvent } from '../../store/CurrencyConvertor/types';
import {
  Card,
  CardContent,
  TextField,
  CardHeader,
  Container,
  makeStyles,
  Theme,
  createStyles,
  Button,
  IconButton
} from '@material-ui/core';
import { SwapHoriz } from '@material-ui/icons';

type CurrencyConvertorFormProps = {
  onConvert: (convertInformation: ConvertEvent) => void;
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
  onConvert
}) => {
  const classes = useStyles();

  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('ILS');

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    onConvert({
      fromCurrency,
      toCurrency
    });
  }, [fromCurrency, toCurrency, onConvert]);

  console.log(fromCurrency, toCurrency);
  return (
    <Container maxWidth="md" className={classes.root}>
      <Card>
        <CardHeader title="Currency Convertor" />
        <CardContent>
          <TextField
            label="Amount"
            defaultValue={1}
            variant="outlined"
            type="number"
          />

          <CurrencySelect
            label="From"
            initialCurrency={fromCurrency}
            onCurrencySelected={handleFromCurrencyChange}
          />
          <IconButton
            className={classes.swap}
            color="primary"
            aria-label="Swap"
            component="span"
            onClick={handleSwap}
          >
            <SwapHoriz />
          </IconButton>

          <CurrencySelect
            label="To"
            initialCurrency={toCurrency}
            onCurrencySelected={handleToCurrencyChange}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default CurrencyConvertorForm;
