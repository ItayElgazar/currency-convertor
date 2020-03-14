import React, { FC } from 'react';
import { Convert } from '../../store/CurrencyConvertor/types';

type CurrencyConvertorFormProps = {
  onConvert: (convertInformation: Convert) => void;
};

const CurrencyConvertorForm: FC<CurrencyConvertorFormProps> = ({
  onConvert
}) => {
  return <div>FORM_HERE</div>;
};

export default CurrencyConvertorForm;
