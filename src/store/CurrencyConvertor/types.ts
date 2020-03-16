export type ConvertEvent = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
};

export type Conversion = ConvertEvent & {
  exchangeRate: number;
  lastUpdated: Date;
};

export type CurrencyConvertorState = {
  conversion: Conversion | undefined;
  actions: {
    isLoading: boolean;
    httpError: string | undefined;
  };
};
