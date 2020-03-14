import { CurrencyConvertorState } from './types';
import { createReducer } from '@reduxjs/toolkit';
import {
  convertCurrency,
  convertCurrencyStarted,
  convertCurrencyConverted
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
  [convertCurrencyConverted.toString()]: (state, { payload }) => {
    const { exchangeRate, amount } = payload;

    return {
      conversion: {
        ...payload,
        convertedAmount: exchangeRate * amount
      },
      actions: {
        ...state.actions,
        isLoading: false
      }
    };
  }
});

export default currencyConvertorReducer;
