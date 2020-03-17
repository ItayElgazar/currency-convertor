import React, { FC } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader } from '@material-ui/core';
import { HistoryInsight } from '../../store/HistoryInsights/types';

type HistoryInsightsProps = {
  insights: HistoryInsight[] | undefined;

  title?: string;
};
const HistoryInsights: FC<HistoryInsightsProps> = ({
  insights = [],
  title
}) => (
  <Card>
    <CardHeader title={title} />
    <ResponsiveContainer width="95%" height={350}>
      <LineChart height={350} data={insights} style={{ margin: '1rem auto' }}>
        <XAxis dataKey="date" />
        <YAxis dataKey="low" type="number" scale="auto" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line
          type="monotone"
          dataKey="open"
          stroke="#ff7300"
          yAxisId={0}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="high"
          stroke="#8884d8"
          yAxisId={0}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#82ca9d"
          yAxisId={0}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

export default HistoryInsights;
