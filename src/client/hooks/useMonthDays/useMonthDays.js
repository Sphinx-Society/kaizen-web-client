import { useEffect, useState } from 'react';
import { getCalendarWeeks } from '../../utils/date';

const useMonthDays = (month, year) => {
  const [monthDays, setMonthDays] = useState([]);
  useEffect(() => {
    setMonthDays(getCalendarWeeks(month, year));
  }, [year, month]);

  return monthDays;
};

export default useMonthDays;
