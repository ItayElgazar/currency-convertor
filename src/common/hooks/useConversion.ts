import { useEffect, useReducer, ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  convertCurrency,
  swapCurrencies
} from '../../store/CurrencyConvertor/actions';
import { RootState, StateActions } from '../../store';

export type UseConversion = [
  (change: 'from' | 'to', currency: string) => void,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => void,
  string,
  string,
  number,
  number | undefined,
  StateActions
];
type UseConversionProps = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
};

type ConversionHookState = UseConversionProps & {
  convertedAmount: number | undefined;
};

const conversionReducer = (
  state: ConversionHookState,
  { type, payload }: { type: string; payload: any }
): ConversionHookState => {
  switch (type) {
    case 'conversion/setFromCurrency':
      return { ...state, fromCurrency: payload };
    case 'conversion/setToCurrency':
      return { ...state, toCurrency: payload };
    case 'conversion/setAmount':
      return { ...state, amount: payload };
    case 'conversion/setConvertedAmount':
      return { ...state, convertedAmount: payload };
    default:
      return { ...state };
  }
};

const useConversion = (initialState: UseConversionProps): UseConversion => {
  const [conversionHookState, dispatchConversionState] = useReducer(
    conversionReducer,
    {
      ...initialState,
      convertedAmount: undefined
    }
  );

  const {
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount
  } = conversionHookState;

  const { actions, conversion } = useSelector(
    (state: RootState) => state.currencyConvertor
  );

  const dispatch = useDispatch();

  const initialDispatch = useCallback(() => {
    dispatch(
      convertCurrency({
        fromCurrency: 'EUR',
        toCurrency: 'ILS',
        amount: 1
      })
    );
  }, [dispatch]);

  const handleCurrencyChange = (change: 'from' | 'to', currency: string) => {
    if (change === 'from') {
      dispatchConversionState({
        type: 'conversion/setFromCurrency',
        payload: currency
      });
      dispatch(convertCurrency({ fromCurrency: currency, toCurrency, amount }));
    } else {
      dispatchConversionState({
        type: 'conversion/setToCurrency',
        payload: currency
      });
      dispatch(convertCurrency({ toCurrency: currency, fromCurrency, amount }));
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value || 1);
    dispatchConversionState({
      type: 'conversion/setAmount',
      payload: newAmount
    });
  };

  const handleCurrenciesSwap = () => {
    dispatchConversionState({
      type: 'conversion/setFromCurrency',
      payload: toCurrency
    });
    dispatchConversionState({
      type: 'conversion/setToCurrency',
      payload: fromCurrency
    });
    dispatch(swapCurrencies());
  };

  useEffect(() => {
    if (conversion?.exchangeRate) {
      const newConvertedAmount = (amount * conversion.exchangeRate).toFixed(4);
      dispatchConversionState({
        type: 'conversion/setConvertedAmount',
        payload: Number(newConvertedAmount)
      });
    }
  }, [initialDispatch, conversion, amount]); // On conversion or change

  useEffect(() => {
    initialDispatch();
  }, [initialDispatch]);

  return [
    handleCurrencyChange,
    handleAmountChange,
    handleCurrenciesSwap,
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    actions
  ];
};

export default useConversion;
