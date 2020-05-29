import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  FaCheck as CheckIcon,
  FaExclamationTriangle as WarningIcon,
  FaExclamationCircle as ErrorIcon,
  FaRegTimesCircle as CloseIcon,
} from 'react-icons/fa';

import useOutsideClick from '../../../hooks/useOutsideClick/useOutsideClick';

import './Alert.scss';

const types = ['error', 'warning', 'success'];

const Alert = (props) => {
  const {
    type,
    message,
    onClose,
    closeTime,
  } = props;

  const icons = {
    error: <ErrorIcon className='alert__icon' />,
    warning: <WarningIcon className='alert__icon' />,
    success: <CheckIcon className='alert__icon' />,
  };

  const alertClassName = clsx({
    'alert': true,
    'alert--error': type === 'error',
    'alert--warning': type === 'warning',
    'alert--success': type === 'success',
  });

  const ref = useRef(null);

  useOutsideClick(ref, onClose);

  React.useEffect(() => {
    const timeout = setTimeout(onClose, closeTime);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <figure
      className={alertClassName}
      ref={ref}
      id='feedback-alert-container'
    >
      {icons[type]}
      <figcaption className='alert__text'>
        {message}
      </figcaption>
      <CloseIcon
        className='alert__close'
        onClick={onClose}
      />
    </figure>
  );
};

Alert.propTypes = {
  /** Type of the alert */
  type: PropTypes.oneOf(types),
  /** Message to show on the alert */
  message: PropTypes.string,
  /** Function to call when the alert is closed */
  onClose: PropTypes.func.isRequired,
  /** Time before the alert closes automatically */
  closeTime: PropTypes.number,
};

Alert.defaultProps = {
  type: 'success',
  message: '',
  closeTime: 6000,
};

export default Alert;
