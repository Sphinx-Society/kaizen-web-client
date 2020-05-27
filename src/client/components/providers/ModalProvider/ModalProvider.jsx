import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../organisms/Modal/Modal';
import setModalDialog from '../../../redux/modalDialog/modalDialog.actions';
import PortalProvider from '../PortalProvider/PortalProvider';

import './ModalProvider.scss';

const ModalProvider = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const { type, message, mainFn } = useSelector((state) => state.modalDialog.modal);

  const closeDialog = () => {
    dispatch(setModalDialog({ modal: { type: '', message: '', mainFn: () => null } }));
  };

  const onClick = () => {
    mainFn();
    closeDialog();
  };

  return (
    <>
      {children}
      {type
        && (
          <PortalProvider>
            {() => {
              return (
                <dialog className='modal-dialog' open={Boolean(type)}>
                  <Modal
                    type={type}
                    message={message}
                    mainFn={onClick}
                    onClose={closeDialog}
                  />
                </dialog>
              );
            }}
          </PortalProvider>
        )}
    </>
  );
};

ModalProvider.propTypes = {
  /** Children to render inside the provider */
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
