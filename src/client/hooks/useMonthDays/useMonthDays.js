import { useEffect, useState } from 'react';

const useMonthDays = (month, year) => {
  const [monthDays, setMonthDays] = useState([]);
  useEffect(() => {
    if (
      typeof month === 'number'
      && typeof year === 'number'
      && Number.isInteger(month)
      && Number.isInteger(year)
    ) {
      const monthStartingColumn = new Date(year, month).getDay();
      const monthLength = 32 - new Date(year, month, 32).getDate();
      const minimumDaysRequired = monthStartingColumn + monthLength;
      const weeks = Math.ceil(minimumDaysRequired / 7);
      const monthDays = [];
      const prevMonth = month > 0 ? month - 1 : 11;
      const prevMonthYear = month > 0 ? year : year - 1;
      const prevMonthLength = 32 - new Date(prevMonthYear, prevMonth, 32).getDate();
      const nextMonth = month < 11 ? month + 1 : 0;

      let date = 0;
      let nextMonthDay = 1;

      for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < 7; day++) {
          if (week === 0 && day < monthStartingColumn) {
            const prevMonthDay = prevMonthLength - monthStartingColumn + 1 + day;
            const prevMonthDate = {
              value: new Date(prevMonthYear, prevMonth, prevMonthDay).getTime(),
              isOtherMonth: true,
            };
            if (monthDays[week]) {
              monthDays[week].days.push(prevMonthDate);
            } else {
              monthDays[week] = { days: [prevMonthDate], id: week };
            }
          }

          if (week === weeks - 1 && date > monthLength) {
            const nextMonthDate = {
              value: new Date(year, nextMonth, nextMonthDay).getTime(),
              isOtherMonth: true,
            };
            if (monthDays[week]) {
              monthDays[week].days.push(nextMonthDate);
            } else {
              monthDays[week] = { days: [nextMonthDate], id: week };
            }
            nextMonthDay += 1;
          }

          if ((day >= monthStartingColumn && week === 0) || (date < monthLength && week !== 0)) {
            date += 1;
            const actualMonthDate = {
              value: new Date(year, month, date).getTime(),
              isOtherMonth: false,
            };
            if (monthDays[week]) {
              monthDays[week].days.push(actualMonthDate);
            } else {
              monthDays[week] = { days: [actualMonthDate], id: week };
            }
            if (date === monthLength) {
              date += 1;
            }
          }
        }
      }
      setMonthDays(monthDays);
    }
  }, [year, month]);

  return monthDays;
};

export default useMonthDays;
