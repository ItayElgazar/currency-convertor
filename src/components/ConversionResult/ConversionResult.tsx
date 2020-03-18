import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

type ConversionResultProps = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
};

const ConversionResult: FC<ConversionResultProps> = ({
  fromCurrency,
  toCurrency,
  amount,
  convertedAmount
}) => (
  <Typography variant="h4" component="p" align="center">
    {amount} {fromCurrency} ={' '}
    <Typography variant="h4" component="span" color="secondary">
      {convertedAmount}
    </Typography>{' '}
    {toCurrency}
  </Typography>
);

export default ConversionResult;
