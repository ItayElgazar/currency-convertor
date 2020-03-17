import { combineReducers } from 'redux';
import currencyConvertorReducer from './CurrencyConvertor/reducers';
import historyInsightsReducer from './HistoryInsights/reducers';

export default combineReducers({
  currencyConvertor: currencyConvertorReducer,
  historyInsights: historyInsightsReducer
});
