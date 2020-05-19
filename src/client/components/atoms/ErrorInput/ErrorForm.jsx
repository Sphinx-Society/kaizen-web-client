import React from 'react';
import './ErrorInput.scss';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorInput = ({ children }) => {
  return (
    <p>
      <FiAlertTriangle />
      {children || 'Usuario o contraseña incorrecta'}
    </p>
  );
};
export default ErrorInput;
