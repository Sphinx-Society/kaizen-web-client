import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoIosSearch as SearchIcon } from 'react-icons/io';
import Surface from '../../atoms/Surface/Surface';

import './TopFilter.scss';

const TopFilter = (props) => {
  const {
    value,
    onChange,
    placeholder,
    disabled,
    disableShadow,
    onEnter,
    onIconClick,
  } = props;

  const inputClassName = clsx({
    'top-filter__input': true,
    '--shadowed': true,
  });

  const enterHandler = (event) => {
    const { which, keyCode } = event;
    if (which === 13 || keyCode === 13) {
      onEnter(event);
    }
  };

  return (
    <Surface
      className='top-filter__container'
      disableSpacing
      disableShadow={disableShadow}
    >
      <input
        className={inputClassName}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={enterHandler}
      />
      <SearchIcon
        className='top-filter__icon'
        size='1.5em'
        onClick={onIconClick}
      />
    </Surface>
  );
};

TopFilter.propTypes = {
  /** Value to give to the filter input */
  value: PropTypes.string.isRequired,
  /** Function to be called on change */
  onChange: PropTypes.func.isRequired,
  /** Placeholder of the input */
  placeholder: PropTypes.string,
  /** Disable the filter input */
  disabled: PropTypes.bool,
  /** Used to remove surface shadow */
  disableShadow: PropTypes.bool,
  /** Function called when user press enter inside the input */
  onEnter: PropTypes.func,
  /** Function called when user click on icon */
  onIconClick: PropTypes.func,
};

TopFilter.defaultProps = {
  placeholder: '',
  disabled: false,
  disableShadow: false,
  onEnter: () => null,
  onIconClick: () => null,
};

export default TopFilter;
