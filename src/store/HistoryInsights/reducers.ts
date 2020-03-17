import { createReducer } from '@reduxjs/toolkit';
import { getHistoryInsightsStarted, setHistoryInsights } from './actions';
import { HistoryInsightsState } from './types';

const initialState: HistoryInsightsState = {
  insights: undefined,
  actions: {
    httpError: undefined,
    isLoading: false
  }
};

const historyInsightsReducer = createReducer(initialState, {
  [getHistoryInsightsStarted.toString()]: state => ({
    ...state,
    actions: {
      ...state.actions,
      isLoading: true
    }
  }),
  [setHistoryInsights.toString()]: (state, { payload }) => ({
    ...state,
    insights: payload,
    actions: {
      ...state.actions,
      isLoading: false
    }
  })
});

export default historyInsightsReducer;
