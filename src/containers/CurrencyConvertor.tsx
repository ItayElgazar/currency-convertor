import React, { useEffect } from 'react';
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
import useConversion from '../common/hooks/useConversion';
import CurrencyConvertorForm from '../components/CurrencyConvertorForm';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import HistoryInsights from '../components/HistoryInsights/HistoryInsights';
import { fetchHistoryInsights } from '../store/HistoryInsights/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2)
    }
  })
);

const CurrencyConvertor = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    actions: { isLoading, httpError }
  } = useSelector((state: RootState) => state.currencyConvertor);
  const { actions: historyInsightsActions, insights } = useSelector(
    (state: RootState) => state.historyInsights
  );

  const [
    handleConversionChange,
    handleAmountChange,
    handleCurrenciesSwap,
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount
  ] = useConversion({
    fromCurrency: 'EUR',
    toCurrency: 'ILS',
    amount: 1
  });

  const handleFromCurrencyChange = (currency: string) => {
    handleConversionChange('from', currency);
    dispatch(fetchHistoryInsights({ fromCurrency: currency, toCurrency }));
  };

  const handleToCurrencyChange = (currency: string) => {
    handleConversionChange('to', currency);
    dispatch(fetchHistoryInsights({ fromCurrency: currency, toCurrency }));
  };

  const handleSwap = () => {
    handleCurrenciesSwap();
    dispatch(
      fetchHistoryInsights({
        fromCurrency: toCurrency,
        toCurrency: fromCurrency
      })
    );
  };

  useEffect(() => {
    dispatch(fetchHistoryInsights({ fromCurrency, toCurrency }));
  }, [dispatch, fromCurrency, toCurrency]);

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

              <ErrorBoundary
                error={httpError || historyInsightsActions.httpError}
              >
                {isLoading ? (
                  <Box textAlign="center">
                    <CircularProgress color="secondary" disableShrink />
                  </Box>
                ) : (
                  <Typography variant="h4" component="p" align="center">
                    {amount} {fromCurrency} ={' '}
                    <Typography variant="h4" component="span" color="secondary">
                      {convertedAmount}
                    </Typography>{' '}
                    {toCurrency}
                  </Typography>
                )}
              </ErrorBoundary>
            </CardContent>
          </Card>

          <Box marginTop={4}>
            <HistoryInsights title="Conversion History" insights={insights} />
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default CurrencyConvertor;
