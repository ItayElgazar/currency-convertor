import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Card,
  Typography,
  CardContent,
  CardHeader,
  makeStyles,
  createStyles,
  Theme,
  CircularProgress,
  Box
} from '@material-ui/core';
import { RootState } from '../store';
import CurrencyConvertorForm from '../components/CurrencyConvertorForm';
import {
  convertCurrency,
  swapCurrencies
} from '../store/CurrencyConvertor/actions';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2)
    },
    spinner: {
      margin: '0 auto'
    }
  })
);

const CurrencyConvertor = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    actions: { isLoading, httpError },
    conversion
  } = useSelector((state: RootState) => state.currencyConvertor);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('ILS');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
    dispatch(convertCurrency({ fromCurrency: currency, toCurrency, amount }));
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    dispatch(convertCurrency({ fromCurrency, toCurrency: currency, amount }));
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value || 1);
    setAmount(amount);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    dispatch(swapCurrencies());
  };

  const Loading = (
    <Box textAlign="center">
      <CircularProgress disableShrink />
    </Box>
  );

  useEffect(() => {
    dispatch(
      convertCurrency({
        fromCurrency: 'EUR',
        toCurrency: 'ILS',
        amount: 1
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (conversion?.exchangeRate) {
      const newConvertedAmount = amount * conversion.exchangeRate;
      setConvertedAmount(Number(newConvertedAmount.toFixed(4)));
    }
  }, [conversion, amount]);

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <Container maxWidth="md">
          <Card>
            <CardHeader title="Currency Convertor" />
            <CardContent>
              <CurrencyConvertorForm
                onToCurrencyChange={handleToCurrencyChange}
                onFromCurrencyChange={handleFromCurrencyChange}
                onAmountChange={handleAmountChange}
                onSwap={handleSwap}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                amount={amount}
                disabled={Boolean(httpError)}
              />

              <ErrorBoundary error={httpError}>
                {isLoading ? (
                  <Box textAlign="center">
                    <CircularProgress disableShrink />
                  </Box>
                ) : (
                  <Typography variant="h4" component="p" align="center">
                    {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                  </Typography>
                )}
              </ErrorBoundary>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default CurrencyConvertor;
