/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './Button.scss';

const Button = (props) => {
  const {
    onClick,
    children,
    type,
    icon,
    iconMode,
    iconPosition,
    iconCenter,
    color,
    className,
    disabled,
    form,
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

  const btnContainerStyles = clsx({
    'btn__container': true,
    'btn__container--cols2': !isIcon && (icon && iconCenter),
    'btn__container--cols3': !isIcon && (icon && !iconCenter && !iconPosition),
    'btn__container--cols3-right': !isIcon && (icon && !iconCenter && iconPosition),
  });

  return (
    <button
      onClick={onClick}
      type={typeButtons[type]}
      className={btnStyles}
      disabled={disabled}
      form={form}
    >
      { icon ? (
        <div className={btnContainerStyles}>
          {!iconPosition
            && <div className='btn__container--icon'>{icon}</div>}
          <div className='btn__container--children'>{children}</div>
          {iconPosition
            && <div className='btn__container--icon'>{icon}</div>}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  /** Function that will be called on click event. */
  onClick: PropTypes.func.isRequired,

  /** The text inside the button or another component */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Specify the type of the button */
  type: PropTypes.string,

  /** Element Icon type */
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

  /** Spacing modes for icon type */
  iconMode: PropTypes.string,

  /** Indicates on which side of the text the icon is placed. left = false | Right = true */
  iconPosition: PropTypes.bool,

  /** Icon and other elements will be centered. */
  iconCenter: PropTypes.bool,

  /** Boolean class to specify if the color button is primary, secondary or warning */
  color: PropTypes.string,

  /** Class to overwrite the styles */
  className: PropTypes.string,

  /** Specify if the button is disabled or not */
  disabled: PropTypes.bool,

  /** If the button is outside a form and you want to active the submit event on click, you can pass the form id */
  form: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  icon: undefined,
  iconMode: undefined,
  iconPosition: false,
  iconCenter: false,
  color: 'default',
  className: undefined,
  disabled: false,
  form: undefined,
};

export default Button;
