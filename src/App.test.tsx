import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import CurrencyConvertor from './containers/CurrencyConvertor';

it('renders CurrencyConvertor container component', () => {
  const wrapper = shallow(<App />);
  const currencyConvertor = <CurrencyConvertor />;
  expect(wrapper.contains(currencyConvertor)).toEqual(true);
});
