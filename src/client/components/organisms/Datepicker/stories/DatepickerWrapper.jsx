import React, { useState } from 'react';
import Datepicker from '../Datepicker';

const Caller = () => {
  const [value, setValue] = useState(new Date().setHours(0, 0, 0, 0));

  const datepickerHandler = (value) => setValue(value);

  return (
    <Datepicker
      value={value}
      onChange={datepickerHandler}
    />
  );
};

export default Caller;
