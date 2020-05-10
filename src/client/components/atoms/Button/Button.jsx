/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Button.scss';

const Button = (props) => {
  const {
    children,
    type,
    onClick,
    className,
    disabled,
    form,
    color,
  } = props;

  const typeButtons = {
    button: 'button',
    submit: 'submit',
    reset: 'reset',
    icon: 'button',
  };

  function colorExists(key, value) {
    const colors = ['primary', 'secondary', 'warning', 'light'];
    return colors[key] === value;
  }
  function typeIsIcon() {
    return type === 'icon';
  }

  const btnStyles = clsx({
    'ssk--spacing': !typeIsIcon(),
    'btn': !typeIsIcon(),
    'btn--primary': colorExists(0, color) && !typeIsIcon(),
    'btn--secondary': colorExists(1, color) && !typeIsIcon(),
    'btn--warning': colorExists(2, color) && !typeIsIcon(),
    'btn-icon': typeIsIcon(),
    'btn-icon--primary': colorExists(0, color) && typeIsIcon(),
    'btn-icon--secondary': colorExists(1, color) && typeIsIcon(),
    'btn-icon--warning': colorExists(2, color) && typeIsIcon(),
    'btn-icon--light': colorExists(3, color) && typeIsIcon(),
    [className]: className,
  });

  return (
    <button
      type={typeButtons[type]}
      onClick={onClick}
      className={btnStyles}
      disabled={disabled}
      form={form}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /** Specify the type of the button */
  type: PropTypes.string,

  /** Function that will be called on click event. */
  onClick: PropTypes.func.isRequired,

  /** Class to overwrite the styles */
  className: PropTypes.string,

  /** Specify if the button is disabled or not */
  disabled: PropTypes.bool,

  /** If the button is outside a form and you want to active the submit event on click, you can pass the form id */
  form: PropTypes.string,

  /** The text inside the button or another component */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  /** Boolean class to specify if the color button is primary, secondary or warning */
  color: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  className: undefined,
  disabled: false,
  form: undefined,
  color: 'default',
};

export default Button;
