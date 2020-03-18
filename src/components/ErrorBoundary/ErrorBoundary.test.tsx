import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, ShallowWrapper } from 'enzyme';
import { Box, Typography } from '@material-ui/core';
import ErrorBoundary from './ErrorBoundary';

describe('#ErrorBoundary', () => {
  let component: ShallowWrapper<any, any, any>;
  const ERROR_MESSAGE = 'This is a general error message';
  const errorToRender = (
    <Box margin="auto" color="text.secondary" p={2}>
      <Typography color="secondary">{ERROR_MESSAGE}</Typography>
    </Box>
  );

  it('should render correctly', () => {
    const errorBoundary = renderer
      .create(<ErrorBoundary error={undefined} />)
      .toJSON();
    expect(errorBoundary).toMatchSnapshot();
  });

  it('should should render an error with some message', () => {
    component = shallow(<ErrorBoundary error={ERROR_MESSAGE} />);
    expect(component.contains(errorToRender)).toEqual(true);
  });

  it('should should render the children when error message is undefined', () => {
    component = shallow(
      <ErrorBoundary error={undefined}>
        <p>Some content</p>
      </ErrorBoundary>
    );
    expect(component.contains(<p>Some content</p>)).toEqual(true);
  });
});
