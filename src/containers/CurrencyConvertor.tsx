import React, { useEffect } from 'react';
import CurrencyConvertorForm from '../components/CurrencyConvertorForm';
import { convertCurrency } from '../store/CurrencyConvertor/actions';
import { useDispatch } from 'react-redux';

const CurrencyConvertor = () => {
  const dispatch = useDispatch();
  const currencyConvertHandler = (convertInformation: any) => {
    console.log(convertInformation);
  };

  useEffect(() => {
    dispatch(
      convertCurrency({
        from: 'EUR',
        to: 'ILS',
        amount: '400'
      })
    );
  }, []);

  return <CurrencyConvertorForm onConvert={currencyConvertHandler} />;
};

export default CurrencyConvertor;
