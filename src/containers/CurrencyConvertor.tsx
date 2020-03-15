import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { ConvertEvent } from '../store/CurrencyConvertor/types';
import CurrencyConvertorForm from '../components/CurrencyConvertorForm';
import { useDispatch } from 'react-redux';
import { convertCurrency } from '../store/CurrencyConvertor/actions';

const CurrencyConvertor = () => {
  const dispatch = useDispatch();
  const currencyConvertHandler = (convertInformation: ConvertEvent) => {
    dispatch(convertCurrency(convertInformation));
  };

  return (
    <>
      <br />
      <Container maxWidth="md">
        <CurrencyConvertorForm onConvert={currencyConvertHandler} />
      </Container>
    </>
  );
};

export default CurrencyConvertor;
