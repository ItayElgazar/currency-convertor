import { createAction, AnyAction } from '@reduxjs/toolkit';
import API_CONFIG from '../../common/apiConfig';
import fetchWrapper from '../../common/fetchWrapper';

import { Convert, Conversion } from './types';
import { ThunkDispatch } from 'redux-thunk';

const BASE_CONVERT_API_URL = `${API_CONFIG.baseUrl}${API_CONFIG.functions.CURRENCY_EXCHANGE_RATE}`;
const convertCurrencyStarted = createAction('currencyConvertor/convert');
const convertCurrencyConverted = createAction(
  'currencyConvertor/converted',
  (conversion: Partial<Conversion>) => ({
    payload: {
      ...conversion
    }
  })
);
const convertCurrencyFailed = createAction('currencyConvertor/convertFailed');

const convertCurrency = ({ from, to, amount }: Convert) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(convertCurrencyStarted());
  try {
    const response = await fetchWrapper<Conversion>(
      buildConvertRequestUrl(from, to)
    );
    dispatch(
      convertCurrencyConverted(buildConversionFromResponse(response, amount))
    );
  } catch (e) {
    dispatch(convertCurrencyFailed());
  }
};

const buildConvertRequestUrl = (from: string, to: string) =>
  `${BASE_CONVERT_API_URL}&from_currency=${from}&to_currency=${to}&apikey=${API_CONFIG.key}`;

const buildConversionFromResponse = (
  response: any,
  amount: string
): Partial<Conversion> => {
  const {
    '1. From_Currency Code': from,
    '3. To_Currency Code': to,
    '5. Exchange Rate': exchangeRate,
    '6. Last Refreshed': lastUpdated
  } = response['Realtime Currency Exchange Rate'];

  return {
    from,
    to,
    exchangeRate,
    amount,
    lastUpdated
  };
};

export {
  convertCurrency,
  convertCurrencyConverted,
  convertCurrencyStarted,
  convertCurrencyFailed
};
