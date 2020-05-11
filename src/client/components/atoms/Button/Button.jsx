/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Button.scss';

const Button = (props) => {
  const {
    children,
    type,
    iconMode,
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

  const colors = ['primary', 'secondary', 'warning', 'light'];
  const iconModes = ['circle-0', 'circle', '1', '2', '3', '4'];

  const isIcon = type === 'icon';

  function applyStyleBool(isIcon, ary, valuetest, index) {
    return isIcon && (ary[index] === valuetest);
  }

  const btnStyles = clsx({
    'ssk--spacing': !isIcon,
    'btn': !isIcon,
    'btn--primary': applyStyleBool(!isIcon, colors, color, 0),
    'btn--secondary': applyStyleBool(!isIcon, colors, color, 1),
    'btn--warning': applyStyleBool(!isIcon, colors, color, 2),
    'btn-icon': isIcon,
    'btn-icon--primary': applyStyleBool(isIcon, colors, color, 0),
    'btn-icon--secondary': applyStyleBool(isIcon, colors, color, 1),
    'btn-icon--warning': applyStyleBool(isIcon, colors, color, 2),
    'btn-icon--light': applyStyleBool(isIcon, colors, color, 3),
    'btn-icon--space-mode-circle-0': applyStyleBool(isIcon, iconModes, iconMode, 0),
    'btn-icon--space-mode-circle': applyStyleBool(isIcon, iconModes, iconMode, 1),
    'btn-icon--space-mode-1': applyStyleBool(isIcon, iconModes, iconMode, 2),
    'btn-icon--space-mode-2': applyStyleBool(isIcon, iconModes, iconMode, 3),
    'btn-icon--space-mode-3': applyStyleBool(isIcon, iconModes, iconMode, 4),
    'btn-icon--space-mode-4': applyStyleBool(isIcon, iconModes, iconMode, 5),
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

  /* Spacing modes for icon type */
  iconMode: PropTypes.string,

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
  iconMode: undefined,
  className: undefined,
  disabled: false,
  form: undefined,
  color: 'default',
};

export default Button;
