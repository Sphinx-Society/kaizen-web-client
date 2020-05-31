import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  FaTrashAlt as DeleteIcon,
  FaSave as SaveIcon,
  FaFileDownload as DownloadIcon,
  FaRegTimesCircle as CloseIcon,
  FaRegCheckCircle as OkIcon,
} from 'react-icons/fa';

import Button from '../../atoms/Button/Button';

import './Modal.scss';

const Modal = (props) => {
  const {
    type,
    message,
    mainFn,
    onClose,
    className,
  } = props;

  const mainAction = {
    delete: {
      message: 'Eliminar',
      color: 'warning',
      icon: <DeleteIcon size='1.2em' />,
      className: '',
    },
    confirm: {
      message: 'Confirmar',
      color: 'secondary',
      icon: <OkIcon size='1.2em' />,
      className: '',
    },
    save: {
      message: 'Guardar',
      color: 'primary',
      icon: <SaveIcon size='1.2em' />,
      className: '',
    },
    download: {
      message: 'Descargar',
      color: 'secondary',
      icon: <DownloadIcon size='1.2em' />,
      className: 'modal__actions-btn--download',
    },
  };

  const modalClassName = clsx({
    'modal': true,
    [className]: className,
  });

  return (
    <div className={modalClassName}>
      <div className='modal__close'>
        <Button
          onClick={onClose}
          type='icon'
          iconMode='circle-0'
          icon={<CloseIcon size='3em' />}
          color='warning'
        />
      </div>

      <p className='modal__message'>
        {message}
      </p>

      <div className='modal__actions'>
        <Button
          onClick={mainFn}
          icon={mainAction[type].icon}
          color={mainAction[type].color}
          className={mainAction[type].className}
          centered
        >
          {mainAction[type].message}
        </Button>

        <Button
          onClick={onClose}
          color='light'
          className='modal__actions-btn-close'
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  /** Type of the dialog */
  type: PropTypes.string.isRequired,
  /** Text to present to the user */
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /** Function that executes the main action of the process */
  mainFn: PropTypes.func.isRequired,
  /** Function that close the process  */
  onClose: PropTypes.func.isRequired,
  /** Class to overwrite the styles */
  className: PropTypes.string,
};

Modal.defaultProps = {
  className: '',
};

export default Modal;
