import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Table from '../../organisms/Table/Table';
import UserCard from '../../organisms/UserCard/UserCard';
import NavbarProvider from '../NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';

import './UsersManagementT.scss';

import UsersTableSchema from '../../../schemas/UsersTable/UsersTable';

const UsersManagementT = (props) => {
  const {
    className,
    data,
    tablePage,
    linkToViewUser,
    linkToUserEdit,
    fnUserDelete,
    menu,
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  const mainClassName = clsx({
    'users-management': true,
    [className]: className,
  });

  const mobileRow = (item) => (
    <UserCard
      className='users-management__user-card--surface'
      isAdminWhoView={true}
      linkToViewMore={`${linkToViewUser}${item.id}`}
      linkToEdit={`${linkToUserEdit}${item.id}`}
      onClickDelete={() => fnUserDelete(item.id)}
      data={[
        { title: 'Rol', description: item.role },
        { title: 'Nombre', description: item.name },
        { title: 'User-name', description: item.username },
        { title: 'País', description: item.country },
        { title: 'Documento ID', description: item.document },
        { title: 'Fecha de creación', description: item.createdAt },
      ]}
    />
  );

  useEffect(() => {
    if (data.columns.length && data.rows.length) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  return (
    <NavbarProvider>
      <MainViewProvider
        title='Gestión de Usuarios'
        showBottomLine
        moveTitle
      >
        <main className={mainClassName}>
          <Table
            columns={data.columns}
            rows={data.rows}
            totalRows={data.rows.length}
            page={tablePage}
            menu={menu}
            isLoading={isLoading}
            mobileRow={mobileRow}
          />
        </main>
      </MainViewProvider>
    </NavbarProvider>
  );
};

UsersManagementT.propTypes = {
  /** Class to overwrite the styles */
  className: PropTypes.string,
  /** Contain the information in a specific struct. Columns to use in the table
   *  and Data to show on the table */
  data: PropTypes.objectOf(UsersTableSchema),
  /** Table number of pages */
  tablePage: PropTypes.number,
  /** Anchor to view more information of the user */
  linkToViewUser: PropTypes.string,
  /** Anchor to edit information of the user */
  linkToUserEdit: PropTypes.string,
  /** Function to "delete" specific user of the register */
  fnUserDelete: PropTypes.func,
  /** Optional menu to table users */
  menu: PropTypes.func,
};

UsersManagementT.defaultProps = {
  className: '',
  data: { columns: [], rows: [] },
  tablePage: 1,
  linkToViewUser: '',
  linkToUserEdit: '',
  fnUserDelete: null,
  menu: null,
};

export default UsersManagementT;
