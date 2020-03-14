export type Convert = {
  from: string;
  to: string;
  amount: string;
};

export type Conversion = Convert & {
  exchangeRate: string;
  convertedAmount: string;
  lastUpdated: Date;
};

export type CurrencyConvertorState = {
  conversion: Conversion | undefined;
  actions: {
    isLoading: boolean;
    httpError: string | undefined;
  };
};
