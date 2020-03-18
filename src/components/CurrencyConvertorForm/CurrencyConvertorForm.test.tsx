import React, { FC } from 'react';
import CurrencyConvertorForm from './CurrencyConvertorForm';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField, IconButton } from '@material-ui/core';
import CurrencySelect from '../CurrencySelect/CurrencySelect';

const toCurrencyChangeMockFn = jest.fn();
const fromCurrencyChangeMockFn = jest.fn();
const amountChangeMockFn = jest.fn();
const swapMockFn = jest.fn();

describe('#CurrencyConvertorForm', () => {
  let component: ShallowWrapper<any, any, any>;
  beforeEach(() => {
    component = shallow(
      <CurrencyConvertorForm
        onFromCurrencyChange={fromCurrencyChangeMockFn}
        onToCurrencyChange={toCurrencyChangeMockFn}
        onAmountChange={amountChangeMockFn}
        onSwap={swapMockFn}
        fromCurrency="ILS"
        toCurrency="EURO"
        amount={1}
      />
    );
  });
  it('should invoke #amountChangeMockFn func when amount changes', () => {
    component
      .find(TextField)
      .first()
      .simulate('change');
    expect(amountChangeMockFn).toBeCalled();
  });

  it('should invoke #fromCurrencyChangeMockFn when currency select changes', () => {
    component
      .find(CurrencySelect)
      .first()
      .dive()
      .find(TextField)
      .simulate('change', { target: { value: 'EURO' } });
    expect(fromCurrencyChangeMockFn).toBeCalled();
  });

  it('should invoke #toCurrencyChangeMockFn when currency select changes', () => {
    component
      .find(CurrencySelect)
      .at(1)
      .dive()
      .find(TextField)
      .simulate('change', { target: { value: 'EURO' } });
    expect(toCurrencyChangeMockFn).toBeCalled();
  });

  it('should invoke #swapMockFn when click on swap icon button', () => {
    component
      .find(IconButton)
      .first()
      .simulate('click');
    expect(swapMockFn).toBeCalled();
  });
});
