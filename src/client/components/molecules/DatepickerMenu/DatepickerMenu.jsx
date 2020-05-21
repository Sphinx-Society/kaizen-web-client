import React from 'react';
import PropTypes from 'prop-types';
import DatepickerCarousel from '../../atoms/DatepickerCarousel/DatepickerCarousel';

import './DatepickerMenu.scss';

const DatepickerMenu = (props) => {
  const {
    month,
    year,
    onPrevMonthClick,
    onNextMonthClick,
    onNextYearClick,
    onPrevYearClick,
    onYearChange,
  } = props;

  return (
    <div className='datepicker-menu__container'>
      <DatepickerCarousel
        onPrevClick={onPrevYearClick}
        onNextClick={onNextYearClick}
        value={year}
        isYearly
        onInputChange={onYearChange}
      />
      <DatepickerCarousel
        onPrevClick={onPrevMonthClick}
        onNextClick={onNextMonthClick}
        value={month}
      />
    </div>
  );
};

DatepickerMenu.propTypes = {
  /** The month to show in the mont section */
  month: PropTypes.string.isRequired,
  /** The year to show in the year section */
  year: PropTypes.number.isRequired,
  /** The function that get calls when you change the go back on month section */
  onPrevMonthClick: PropTypes.func.isRequired,
  /** The function that get calls when you go forward on month section */
  onNextMonthClick: PropTypes.func.isRequired,
  /** The function that get calls when you go forward on year section */
  onNextYearClick: PropTypes.func.isRequired,
  /** The function that get calls when you go back on year section */
  onPrevYearClick: PropTypes.func.isRequired,
  /** The year can be changed manually, when that is dodne this function os called */
  onYearChange: PropTypes.func.isRequired,
};

export default DatepickerMenu;
