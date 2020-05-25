import React from 'react';
import { useSelector } from 'react-redux';

import UsersManagementTemplate from '../../templates/UsersManagementTemplate/UsersManagementTemplate';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';

const UserManagement = () => {
  const users = useSelector((state) => state.users || []);
  const linkToCreateNewUser = '/users/create/';
  const fnImportUsers = () => alert('Importar Usuarios');
  const linkViewUserProfile = '/users/view/';
  const linkEditUserProfile = '/users/edit/';
  const fnDeleteUser = (id) => alert(`Eliminar elemento ${id}`);

  return (
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
  );
};

export default UserManagement;
