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
    primary,
    secondary,
  } = props;

  const btnStyles = clsx({
    'btn--principal': true,
    'btn--primary': primary,
    'btn--secondary': secondary,
    [className]: className,
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={btnStyles}
      disabled={disabled}
      form={form}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  form: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  className: '',
  disabled: false,
  form: '',
  primary: true,
  secondary: false,
};
