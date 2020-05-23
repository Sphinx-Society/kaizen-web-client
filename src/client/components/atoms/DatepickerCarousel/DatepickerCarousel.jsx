import React from 'react';
import PropTypes from 'prop-types';
import {
  FaChevronRight as RightIcon,
  FaChevronLeft as LeftIcon,
} from 'react-icons/fa';

import { colorFontMain } from './DatepickerCarousel.scss';

const DatepickerCarousel = (props) => {
  const {
    onPrevClick,
    onNextClick,
    value,
    isYearly,
    onInputChange,
  } = props;

  return (
    <div className='datepicker-carousel__container'>
      <button
        className='datepicker-carousel__button'
        type='button'
        onClick={onPrevClick}
      >
        <LeftIcon size='1.2em' color={colorFontMain} />
      </button>
      {isYearly ? (
        <input
          className='datepicker-carousel__input'
          value={value}
          onChange={onInputChange}
          type='number'
        />
      ) : (
        <p className='datepicker-carousel__text'>{value}</p>
      )}
      <button
        className='datepicker-carousel__button'
        type='button'
        onClick={onNextClick}
      >
        <RightIcon size='1.2em' color='#383a40' />
      </button>
    </div>
  );
};

DatepickerCarousel.propTypes = {
  /** Function to be called clicking on right chevron */
  onPrevClick: PropTypes.func.isRequired,
  /** Function to be called clicking on left chevron */
  onNextClick: PropTypes.func.isRequired,
  /** The value to be shown on center */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** This activate the year variant of the component and the value now is rendered inside a number input */
  isYearly: PropTypes.bool,
  /** Function to be called when the year is changed from inside the number input */
  onInputChange: PropTypes.func,
};

DatepickerCarousel.defaultProps = {
  isYearly: false,
  onInputChange: () => null,
};

export default DatepickerCarousel;
