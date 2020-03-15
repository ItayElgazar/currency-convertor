export type ConvertEvent = {
  fromCurrency: string;
  toCurrency: string;
};

export type Conversion = ConvertEvent & {
  exchangeRate: string;
  lastUpdated: Date;
};

export type CurrencyConvertorState = {
  conversion: Conversion | undefined;
  actions: {
    isLoading: boolean;
    httpError: string | undefined;
  };
};
