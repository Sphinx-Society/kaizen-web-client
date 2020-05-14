import React from 'react';
import PropTypes from 'prop-types';
import { IoIosSearch as SearchIcon } from 'react-icons/io';
import Surface from '../../atoms/Surface/Surface';

import './TopFilter.scss';

const TopFilter = (props) => {
  const {
    value,
    onChange,
    placeholder,
    disabled,
  } = props;

  return (
    <Surface
      className='top-filter__container'
      disableSpacing
    >
      <input
        className='top-filter__input'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <SearchIcon
        className='top-filter__icon'
        size='1.5em'
      />
    </Surface>
  );
};

TopFilter.propTypes = {
  /**
   * Value to give to the filter input
   */
  value: PropTypes.string.isRequired,
  /**
   * Function to be called on change
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Placeholder of the input
   */
  placeholder: PropTypes.string,
  /**
   * Disable the filter input
   */
  disabled: PropTypes.bool,
};

TopFilter.defaultProps = {
  placeholder: '',
  disabled: false,
};

export default TopFilter;
