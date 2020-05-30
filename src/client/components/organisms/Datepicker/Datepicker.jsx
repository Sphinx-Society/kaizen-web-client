import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoMdCalendar as CalendarIcon } from 'react-icons/io';
import DatepickerDay from '../../atoms/DatepickerDay/DatepickerDay';
import DatepickerMenu from '../../molecules/DatepickerMenu/DatepickerMenu';
import Surface from '../../atoms/Surface/Surface';

import useMonthDays from '../../../hooks/useMonthDays/useMonthDays';
import useOutsideClick from '../../../hooks/useOutsideClick/useOutsideClick';
import { getStringFromDate } from '../../../utils/date';

import './Datepicker.scss';

const Datepicker = (props) => {
  const {
    weekDays,
    name,
    onChange,
    value,
    months,
    initialMonth,
    initialYear,
    placeholder,
    id,
    disabled,
  } = props;

  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);
  const [calendarIsVisible, setCalendarIsVisible] = useState(false);
  const datePickerRef = useRef(null);

  const monthDays = useMonthDays(month, year);

  const nextMonthClickHandler = () => {
    let nextMonth = month + 1;
    if (month > 10) {
      nextMonth = 0;
      setYear(year + 1);
    }
    setMonth(nextMonth);
  };

  const prevMonthClickHandler = () => {
    let prevMonth = month - 1;
    if (month < 1) {
      prevMonth = 11;
      setYear(year - 1);
    }
    setMonth(prevMonth);
  };

  const nextYearClickHandler = () => setYear(year + 1);

  const prevYearClickHandler = () => setYear(year - 1);

  const setYearHandler = (event) => setYear(parseInt(event.target.value, 10));

  const calendarIsVisibleToggle = () => setCalendarIsVisible(!calendarIsVisible);

  const showCalendar = () => setCalendarIsVisible(true);

  const outsideClickHandler = () => setCalendarIsVisible(false);;

  useOutsideClick(datePickerRef, outsideClickHandler);

  const labelClass = clsx({
    'datepicker__input__label': true,
    'datepicker__input__label--collected': value,
  });

  return (
    <div
      className='datepicker__container'
      ref={datePickerRef}
    >
      <div className='datepicker__input__container'>
        <input
          className='datepicker__input'
          id={id}
          value={getStringFromDate(new Date(value))}
          readOnly
          onFocus={showCalendar}
          disabled={disabled}
          name={name}
        />
        <label
          className={labelClass}
          htmlFor={id}
        >
          {placeholder}
        </label>
        <button
          className='datepicker__input__button'
          type='button'
          onClick={calendarIsVisibleToggle}
          disabled={disabled}
        >
          <CalendarIcon size='2em' />
        </button>
      </div>
      {calendarIsVisible && (
        <Surface
          className='datepicker__calendar__container'
          disableSpacing
        >
          <DatepickerMenu
            onPrevMonthClick={prevMonthClickHandler}
            onNextMonthClick={nextMonthClickHandler}
            onNextYearClick={nextYearClickHandler}
            onPrevYearClick={prevYearClickHandler}
            month={months[month]}
            year={year}
            onYearChange={setYearHandler}
          />
          <table className='datepicker__calendar__table__container'>
            <thead>
              <tr className='datepicker__calendar__week-days'>
                {weekDays.map((day) => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {monthDays.map(({ id, days }) => (
                <tr key={id}>
                  {days.map((day) => {
                    return (
                      <DatepickerDay
                        key={day.value}
                        isOtherMonth={day.isOtherMonth}
                        onClick={onChange}
                        name={name}
                        selectedDay={value}
                        day={day.value}
                        weekDay={day.weekDay}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      )}
    </div>
  );
};

Datepicker.propTypes = {
  /** It can receive the month to init with, value bewteen 0-11 */
  initialMonth: PropTypes.number,
  /** It can receive the year to init with */
  initialYear: PropTypes.number,
  /** It can receive the days of the week to use in the calendar */
  weekDays: PropTypes.arrayOf(PropTypes.string),
  /** It can receive the months to use in the calendar */
  months: PropTypes.arrayOf(PropTypes.string),
  /** Actual day by default, it can be a date representative number or a string in DD/MM/YYYY format */
  value: PropTypes.number,
  /** This function will be called when a new date is selected */
  onChange: PropTypes.func,
  /** The placeholder it would be shown on the date input */
  placeholder: PropTypes.string,
};

Datepicker.defaultProps = {
  initialMonth: new Date().getMonth(),
  initialYear: new Date().getFullYear(),
  weekDays: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sab'],
  months: ['January', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  value: new Date().setHours(0, 0, 0, 0),
  onChange: () => null,
  placeholder: 'Fecha',
};

export default Datepicker;
