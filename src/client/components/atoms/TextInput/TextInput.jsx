import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './TextInput.scss';

const TextInput = (props) => {
  const {
    id,
    placeholder,
    onChange,
    value,
    containerClassName,
    labelClassName,
    inputClassName,
    inputName,
    required,
    disabled,
    type,
    color,
    icon,
    iconPosition,
  } = props;

  const container = clsx({
    'text-input__container': true,
    [containerClassName]: containerClassName,
  });

  const label = clsx({
    'text-input__label': true,
    'text-input__label--icon-left': iconPosition === 'left',
    'text-input__label--collected': value,
    'text-input__label--collected--icon-left': value && iconPosition === 'left',
    [labelClassName]: labelClassName,
  });

  const input = clsx({
    'text-input__input': true,
    'text-input__input--primary': color === 'primary',
    'text-input__input--secondary': color === 'secondary',
    'text-input__input--icon-right': iconPosition === 'right',
    'text-input__input--icon-left': iconPosition === 'left',
    [inputClassName]: inputClassName,
  });

  const iconClassName = clsx({
    'text-input__icon-container': true,
    'text-input__icon-container--icon-right': iconPosition === 'right',
    'text-input__icon-container--icon-left': iconPosition === 'left',
  });

  return (
    <div className={container}>
      <input
        name={inputName}
        className={input}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        type={type}
      />
      <label
        className={label}
        htmlFor={id}
      >
        {placeholder}
      </label>
      {icon && (
        <span className={iconClassName}>
          {icon}
        </span>
      )}
    </div>
  );
};

TextInput.propTypes = {
  /**
   * The input identification, it's also needed for the placeholder to move on click
   */
  id: PropTypes.string.isRequired,
  /**
   * The input identification, it's also needed for the placeholder to move on click
   */
  type: PropTypes.oneOf(['text', 'password', 'email']),
  /**
   * It represent both, placeholder and label
   */
  placeholder: PropTypes.string.isRequired,
  /**
   * Function to be called on input change
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Value to be shown on the input
   */
  value: PropTypes.string.isRequired,
  /**
   * Classname to overwrite container styles
   */
  containerClassName: PropTypes.string,
  /**
   * Classname to overwrite the label styles
   */
  labelClassName: PropTypes.string,
  /**
   * Classname to overwrite the input styles
   */
  inputClassName: PropTypes.string,
  /**
   * To make the input field required inside a form
   */
  required: PropTypes.bool,
  /**
   * This prop make the input disabled
   */
  disabled: PropTypes.bool,
  /**
   * It change the input color from primary to secondary
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * Icon to be shown on the input
   */
  icon: PropTypes.node,
  /**
   * Position of the icon, left or rigth
   */
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

TextInput.defaultProps = {
  containerClassName: '',
  labelClassName: '',
  inputClassName: '',
  required: false,
  disabled: false,
  color: 'primary',
  type: 'text',
};

export default TextInput;
