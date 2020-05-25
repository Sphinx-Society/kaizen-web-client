import React from 'react';
import { useSelector } from 'react-redux';

import UsersManagementT from '../../templates/UsersManagementT/UsersManagementT';

const UserManagement = () => {
  const users = useSelector((state) => state.users || []);
  const linkToCreateNewUser= '/users/create/'
  const fnImportUsers = () => alert(`Importar Usuarios`);
  const linkViewUserProfile = '/users/view/';
  const linkEditUserProfile = '/users/edit/';
  const fnDeleteUser = (id) => alert(`Eliminar elemento ${id}`);

  return (
    <UsersManagementT
      data={{ columns: [], rows: users }}
      tablePage={1}
      linkToCreateNewUser={linkToCreateNewUser}
      fnImportUsers={fnImportUsers}
      linkToViewUser={linkViewUserProfile}
      linkToEditUser={linkEditUserProfile}
      fnDeleteUser={fnDeleteUser}
    />
  );
};

export default UserManagement;
