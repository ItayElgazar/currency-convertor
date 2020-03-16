import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
type ErrorBoundaryProps = {
  error: string | undefined;
};
const ErrorBoundary: FC<ErrorBoundaryProps> = ({ error, children }) =>
  error ? (
    <Box margin="auto" color="text.secondary" border="1px solid #d8d8d8" p={2}>
      <Typography color="secondary">{error}</Typography>
    </Box>
  ) : (
    <>{children}</>
  );

ErrorBoundary.propTypes = {
  error: PropTypes.string.isRequired
};

export default ErrorBoundary;
