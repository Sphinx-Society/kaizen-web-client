import React, { useRef, useEffect } from 'react';
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

const Alert = (props) => {
  const {
    type,
    message,
    onClose,
    closeTime,
  } = props;

  const ref = useRef(null);

  useEffect(() => {
    setTimeout(onClose, closeTime);
  }, []);

  const icons = {
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    success: <CheckIcon />,
  };

  const alertClassName = clsx({
    'alert': true,
    'alert--error': type === 'error',
    'alert--warning': type === 'warning',
    'alert--success': type === 'success',
  });

  useOutsideClick(ref, onClose);

  return (
    <div
      className={alertClassName}
      ref={ref}
    >
      <div className='alert__icon'>
        {icons[type]}
      </div>
      <div className='alert__text'><p>{message}</p></div>
      <CloseIcon
        className='alert__close'
        onClick={onClose}
      />
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'success']),
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  closeTime: PropTypes.number,
};

Alert.defaultProps = {
  type: 'success',
  message: '',
  closeTime: 6000,
};

export default Alert;
