import React from 'react';
import ConversionResult from './ConversionResult';
import renderer from 'react-test-renderer';

describe('#ConversionResult', () => {
  it('should render correctly', () => {
    const conversionResult = renderer
      .create(
        <ConversionResult
          fromCurrency="EURO"
          toCurrency="ILS"
          amount={1}
          convertedAmount={4}
        />
      )
      .toJSON();
    expect(conversionResult).toMatchSnapshot();
  });
});
