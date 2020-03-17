import { createAction, AnyAction } from '@reduxjs/toolkit';
import API_CONFIG from '../../common/apiConfig';

import { HistoryInsight } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { numOfDaysBetween } from '../../common/utils';

const BASE_CONVERT_API_URL = `${API_CONFIG.baseUrl}${API_CONFIG.functions.FX_DAILY}`;
const getHistoryInsightsStarted = createAction('historyInsights/fetch');
const getHistoryInsights = createAction('historyInsights/get');
const setHistoryInsights = createAction(
  'historyInsights/set',
  (historyInsights: HistoryInsight[]) => ({
    payload: historyInsights
  })
);

const fetchHistoryInsights = ({ fromCurrency, toCurrency }: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(getHistoryInsightsStarted());
  try {
    const response = await fetch(
      buildHistoryInsightsRequestFromUrl(fromCurrency, toCurrency)
    );

    dispatch(setHistoryInsights(buildHistoryInsightsFromResponse(response)));
  } catch (e) {}
};

const buildHistoryInsightsRequestFromUrl = (from: string, to: string) =>
  `${BASE_CONVERT_API_URL}&from_symbol=${from}&to_symbol=${to}&apikey=${API_CONFIG.key}`;

const buildHistoryInsightsFromResponse = (response: any): HistoryInsight[] => {
  const { 'Time Series FX (Daily)': timeSeries } = response;
  return Object.entries(timeSeries).reduce(
    (acc: HistoryInsight[], [date, dailyPrices]: any) => {
      if (!acc) {
        acc = [];
      }
      const insightDate = new Date(date);
      if (numOfDaysBetween(insightDate, new Date()) <= 30) {
        const {
          '1. open': open,
          '2. high': high,
          '3. low': low,
          '4. close': close
        } = dailyPrices;

        acc.push({
          date: date,
          open: Number(open),
          low: Number(low),
          high: Number(high),
          close: Number(close)
        });
      }

      return acc;
    },
    []
  );
};

export {
  fetchHistoryInsights,
  getHistoryInsights,
  setHistoryInsights,
  getHistoryInsightsStarted
};
