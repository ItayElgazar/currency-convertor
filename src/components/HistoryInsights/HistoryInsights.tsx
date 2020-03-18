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
import {
  Card,
  CardHeader,
  Box,
  CircularProgress,
  CardMedia,
  CardContent,
  Container
} from '@material-ui/core';
import { HistoryInsight } from '../../store/HistoryInsights/types';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

type HistoryInsightsProps = {
  insights: HistoryInsight[] | undefined;
  isLoading: boolean;
  error: string | undefined;
  title?: string;
};

const cardStyle = {
  display: 'block',
  height: '500px'
};

const HistoryInsights: FC<HistoryInsightsProps> = ({
  insights = [],
  isLoading,
  error,
  title
}) => {
  return (
    <Card style={cardStyle}>
      <CardContent>
        <CardHeader title={title} />
        <ErrorBoundary error={error}>
          {isLoading ? (
            <Box textAlign="center">
              <CircularProgress color="secondary" disableShrink />
            </Box>
          ) : (
            <ResponsiveContainer width="95%" height={350}>
              <LineChart
                height={350}
                data={insights}
                style={{ margin: '1rem auto' }}
              >
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
          )}
        </ErrorBoundary>
      </CardContent>
    </Card>
  );
};

export default HistoryInsights;
