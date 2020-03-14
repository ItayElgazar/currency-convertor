import React, { FC } from 'react';

type CurrencyConvertorFormProps = {
  onConvert: (convertInformation: any) => void;
};

const CurrencyConvertorForm: FC<CurrencyConvertorFormProps> = ({
  onConvert
}) => {
  return <div>FORM_HERE</div>;
};

export default CurrencyConvertorForm;
