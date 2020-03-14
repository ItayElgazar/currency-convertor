import React from 'react';
import CurrencyConvertorForm from '../components/CurrencyConvertorForm';

const CurrencyConvertor = () => {
  const currencyConvertHandler = (convertInformation: any) => {
    console.log(convertInformation);
  };

  return <CurrencyConvertorForm onConvert={currencyConvertHandler} />;
};

export default CurrencyConvertor;
