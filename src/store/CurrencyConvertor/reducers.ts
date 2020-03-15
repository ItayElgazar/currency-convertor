import { CurrencyConvertorState } from './types';
import { createReducer } from '@reduxjs/toolkit';
import {
  convertCurrency,
  convertCurrencyStarted,
  convertCurrencyConverted,
  convertCurrencyFailed
} from './actions';

const initialState: CurrencyConvertorState = {
  conversion: undefined,
  actions: {
    httpError: undefined,
    isLoading: false
  }
};

const calculateConversion = (exchangeRage: number, amount: number) =>
  exchangeRage * amount;

const currencyConvertorReducer = createReducer(initialState, {
  [convertCurrencyStarted.toString()]: state => ({
    ...state,
    actions: {
      ...state.actions,
      isLoading: true
    }
  }),
  [convertCurrencyConverted.toString()]: (state, { payload }) => {
    const { exchangeRate, amount } = payload;

    return {
      conversion: {
        ...payload,
        convertedAmount: calculateConversion(exchangeRate, amount)
      },
      actions: {
        ...state.actions,
        isLoading: false
      }
    };
  },
  [convertCurrencyFailed.toString()]: (state, { payload }) => ({
    ...state,
    actions: {
      ...state.actions,
      isLoading: false,
      httpError: payload
    }
  })
});

export default currencyConvertorReducer;
