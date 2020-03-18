import React from 'react';
import renderer from 'react-test-renderer';
import CurrencySelect from './CurrencySelect';

describe('#CurerncySelect', () => {
  it('renders correctly', () => {
    const currencySelect = renderer
      .create(<CurrencySelect onCurrencySelected={jest.fn()} />)
      .toJSON();
    expect(currencySelect).toMatchSnapshot();
  });
});
