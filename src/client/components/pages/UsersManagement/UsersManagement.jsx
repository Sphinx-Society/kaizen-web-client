import React from 'react';
import { useSelector } from 'react-redux';

import UsersManagementT from '../../templates/UsersManagementT/UsersManagementT';

const UserManagement = () => {
  const users = useSelector((state) => state.users || []);
  const linkViewUserProfile = useSelector((state) => state.linkViewUserProfile || '');
  const linkEditUserProfile = useSelector((state) => state.linkEditUserProfile || '');
  const fnUserDelete = (id) => alert(`Eliminar elemento ${id}`);

  return (
    <UsersManagementT
      data={{ columns: [], rows: users }}
      tablePage={1}
      linkToViewUser={linkViewUserProfile}
      linkToUserEdit={linkEditUserProfile}
      fnUserDelete={fnUserDelete}
    />
  );
};

export default UserManagement;
