import React, { FC } from 'react';
import { ConvertEvent } from '../../store/CurrencyConvertor/types';

type CurrencyConvertorFormProps = {
  onConvert: (convertInformation: ConvertEvent) => void;
};

const CurrencyConvertorForm: FC<CurrencyConvertorFormProps> = ({
  onConvert
}) => {
  return <div>FORM_HERE</div>;
};

export default CurrencyConvertorForm;
