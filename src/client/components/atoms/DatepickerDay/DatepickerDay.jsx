import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './DatepickerDay.scss';

const DatepickerDay = (props) => {
  const {
    selectedDay,
    isOtherMonth,
    onClick,
    day,
  } = props;

  const datePickerDayClassName = clsx({
    'datepicker-day__container': true,
    'datepicker-day__container--other-month': isOtherMonth,
    'datepicker-day__container--selected': day === selectedDay,
  });

  const handleOnClick = () => onClick(day);

  return (
    <td
      className={datePickerDayClassName}
      onClick={handleOnClick}
    >
      {new Date(day).getDate()}
    </td>
  );
};

DatepickerDay.propTypes = {
  /** This tell the atom to use the isOtherMonth styles */
  isOtherMonth: PropTypes.bool.isRequired,
  /** Function to be call when you click on a day */
  onClick: PropTypes.func.isRequired,
  /** This tell the atom if the day is selected */
  selectedDay: PropTypes.number.isRequired,
  /** This is the day to render */
  day: PropTypes.number.isRequired,
};

export default DatepickerDay;
