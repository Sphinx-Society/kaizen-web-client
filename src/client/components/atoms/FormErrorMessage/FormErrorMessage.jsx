import React from 'react';
import PropTypes from 'prop-types';
import { FiAlertTriangle as AlertIcon } from 'react-icons/fi';

import './FormErrorMessage.scss';

const FormErrorMessage = (props) => {
  const { children } = props;

  return (
    <p className='error-form'>
      <AlertIcon />
      {children}
    </p>
  );
};

FormErrorMessage.propTypes = {
  /** Message to shown or component to render inside the alert */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

FormErrorMessage.defaultProps = {
  children: 'Usuario o contraseña incorrecta',
};

export default FormErrorMessage;
