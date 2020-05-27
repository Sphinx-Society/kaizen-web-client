import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UsersManagementTemplate from '../../templates/UsersManagementTemplate/UsersManagementTemplate';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import ModalProvider from '../../providers/ModalProvider/ModalProvider';

import setModalDialog from '../../../redux/modalDialog/modalDialog.actions';

const UserManagement = () => {
  const users = useSelector((state) => state.users || []);
  const dispatch = useDispatch();
  const linkToCreateNewUser = '/users/create/';
  const linkViewUserProfile = '/users/view/';
  const linkEditUserProfile = '/users/edit/';

  // Example
  const fnImportUsers = () => dispatch(setModalDialog({
    modal: {
      type: 'download',
      message: 'Desea importar archivos, en realidad sería un <Link />',
      mainFn: () => alert('Bajando archivo'),
    },
  }));

  // Example
  const fnDeleteUser = (id) => dispatch(setModalDialog({
    modal: {
      type: 'delete',
      message: `Desea eliminar al usuario ${id}`,
      mainFn: () => alert('Usuario eliminado'),
    },
  }));

  return (
    <ModalProvider>
      <FeedbackProvider>
        <UsersManagementTemplate
          data={{ columns: [], rows: users }}
          tablePage={1}
          linkToCreateNewUser={linkToCreateNewUser}
          fnImportUsers={fnImportUsers}
          linkToViewUser={linkViewUserProfile}
          linkToEditUser={linkEditUserProfile}
          fnDeleteUser={fnDeleteUser}
        />
      </FeedbackProvider>
    </ModalProvider>
  );
};

export default UserManagement;
