/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './Button.scss';

const colors = ['primary', 'secondary', 'warning', 'light'];
const iconModes = ['circle-0', 'circle', '1', '2', '3', '4'];

const Button = (props) => {
  const {
    onClick,
    children,
    type,
    icon,
    iconMode,
    iconRight,
    centered,
    color,
    className,
    disabled,
    form,
    implementWrapper,
  } = props;

  const isIcon = type === 'icon';

  const setClass = (isIcon, array, value, index) => isIcon && (array[index] === value);

  const buttonClassName = clsx({
    'btn': !isIcon,
    'btn--spaced': !isIcon,
    'btn--primary': setClass(!isIcon, colors, color, 0),
    'btn--secondary': setClass(!isIcon, colors, color, 1),
    'btn--warning': setClass(!isIcon, colors, color, 2),
    'btn-icon': isIcon,
    'btn-icon--primary': setClass(isIcon, colors, color, 0),
    'btn-icon--secondary': setClass(isIcon, colors, color, 1),
    'btn-icon--warning': setClass(isIcon, colors, color, 2),
    'btn-icon--light': setClass(isIcon, colors, color, 3),
    'btn-icon--space-mode-circle-0': setClass(isIcon, iconModes, iconMode, 0),
    'btn-icon--space-mode-circle': setClass(isIcon, iconModes, iconMode, 1),
    'btn-icon--space-mode-1': setClass(isIcon, iconModes, iconMode, 2),
    'btn-icon--space-mode-2': setClass(isIcon, iconModes, iconMode, 3),
    'btn-icon--space-mode-3': setClass(isIcon, iconModes, iconMode, 4),
    'btn-icon--space-mode-4': setClass(isIcon, iconModes, iconMode, 5),
    [className]: className,
  });

  const contentClassName = clsx({
    'btn__content': true,
    'btn__content--cols2': !isIcon && (icon && centered),
    'btn__content--cols3': !isIcon && (icon && !centered && !iconRight),
    'btn__content--cols3-right': !isIcon && (icon && !centered && iconRight),
  });

  const Btn = () => {
    return (
      <button
        onClick={onClick}
        type={type}
        className={buttonClassName}
        disabled={disabled}
        form={form}
      >
        {icon ? (
          <div className={contentClassName}>
            {!iconRight && <div className='btn__container--icon'>{icon}</div>}
            <div className='btn__container--children'>{children}</div>
            {iconRight && <div className='btn__container--icon'>{icon}</div>}
          </div>
        ) : children}
      </button>
    );
  };

  if (implementWrapper) {
    return (
      <div className='btn__wrapper'>
        <Btn />
      </div>
    );
  }

  return (<Btn />);
};

Button.propTypes = {
  /** Function that will be called on click event. */
  onClick: PropTypes.func,
  /** The text inside the button or another component */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Specify the type of the button */
  type: PropTypes.oneOf(['button', 'submit', 'reset', 'icon']),
  /** Element Icon type */
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /** Spacing modes for icon type */
  iconMode: PropTypes.oneOf(iconModes),
  /** Indicates is placed on the right side of the text */
  iconRight: PropTypes.bool,
  /** Icon and other elements will be centered. */
  centered: PropTypes.bool,
  /** Boolean class to specify if the color button is primary, secondary or warning */
  color: PropTypes.oneOf(colors),
  /** Class to overwrite the styles */
  className: PropTypes.string,
  /** Specify if the button is disabled or not */
  disabled: PropTypes.bool,
  /** Specify if the button should follow the standard wrapping and send it to the bottom of the screen in mobile */
  implementWrapper: PropTypes.bool,
  /** If the button is outside a form and you want to active the submit event on click, you can pass the form id */
  form: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  icon: null,
  iconMode: null,
  iconRight: false,
  centered: false,
  color: 'primary',
  className: '',
  disabled: false,
  implementWrapper: false,
  form: '',
  children: null,
  onClick: null,
};

export default Button;
