export type HistoryInsight = {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type HistoryInsightsState = {
  insights: HistoryInsight[] | undefined;
  actions: {
    isLoading: boolean;
    httpError: string | undefined;
  };
};
