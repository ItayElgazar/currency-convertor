import { combineReducers } from 'redux';
import currencyConvertorReducer from './CurrencyConvertor/reducers';

export default combineReducers({
  currencyConvertor: currencyConvertorReducer
});
