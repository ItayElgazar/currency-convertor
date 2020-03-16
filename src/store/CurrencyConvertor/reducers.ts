import { CurrencyConvertorState, Conversion } from './types';

import { createReducer } from '@reduxjs/toolkit';
import {
  convertCurrencyStarted,
  convertCurrencyConverted,
  convertCurrencyFailed,
  swapCurrencies
} from './actions';

const initialState: CurrencyConvertorState = {
  conversion: undefined,
  actions: {
    httpError: undefined,
    isLoading: false
  }
};

const currencyConvertorReducer = createReducer(initialState, {
  [convertCurrencyStarted.toString()]: state => ({
    ...state,
    actions: {
      ...state.actions,
      isLoading: true
    }
  }),
  [convertCurrencyConverted.toString()]: (state, { payload }) => ({
    ...state,
    conversion: {
      ...payload
    },
    actions: {
      ...state.actions,
      isLoading: false
    }
  }),
  [convertCurrencyFailed.toString()]: (state, { payload }) => ({
    ...state,
    actions: {
      ...state.actions,
      isLoading: false,
      httpError: payload
    }
  }),
  [swapCurrencies.toString()]: (state, { payload }) => {
    const conversion = state.conversion as Conversion;

    return {
      ...state,
      conversion: {
        ...conversion,
        fromCurrency: conversion.toCurrency,
        toCurrency: conversion.fromCurrency,
        exchangeRate: 1 / conversion.exchangeRate
      }
    };
  }
});

export default currencyConvertorReducer;
