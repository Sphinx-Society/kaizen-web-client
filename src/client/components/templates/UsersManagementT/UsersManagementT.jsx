import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FaPlus as PlusIcon, FaFileCsv as FileImport } from 'react-icons/fa';

import Table from '../../organisms/Table/Table';
import UserCard from '../../organisms/UserCard/UserCard';
import NavbarProvider from '../NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import Button from '../../atoms/Button/Button';
import { getStringFromDate } from '../../../utils/date';

import './UsersManagementT.scss';

import UsersTableSchema from '../../../schemas/UsersTable/UsersTable';

const UsersManagementT = (props) => {
  const {
    className,
    data,
    tablePage,
    linkToCreateNewUser,
    fnImportUsers,
    linkToViewUser,
    linkToEditUser,
    fnDeleteUser,
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  const mainClassName = clsx({
    'users-management': true,
    [className]: className,
  });

  const menu = () => (
    <div className='btn-menuT'>
      <Button
        color='secondary'
        icon={<FileImport size='1.2em' />}
        onClick={fnImportUsers}
      >
        Importar .csv
      </Button>
      <Link to={linkToCreateNewUser}>
        <Button
          color='primary'
          icon={<PlusIcon size='1.2em' />}
          onClick={() => null}
        >
          Crear usuario
        </Button>
      </Link>
    </div>
  );

  const mobileRow = (item) => (
    <UserCard
      className='users-management__user-card--surface'
      isAdminWhoView={true}
      linkToViewMore={`${linkToViewUser}${item.id}`}
      linkToEdit={`${linkToEditUser}${item.id}`}
      onClickDelete={() => fnDeleteUser(item.id)}
      data={[
        { title: 'Rol', description: item.role },
        { title: 'Nombre', description: item.name },
        { title: 'User-name', description: item.username },
        { title: 'País', description: item.country },
        { title: 'Documento ID', description: item.document },
        { title: 'Fecha de creación', description: getStringFromDate(item.createdAt) },
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
        menu={menu()}
      >
        <main className={mainClassName}>
          <Table
            columns={data.columns}
            rows={data.rows}
            totalRows={data.rows.length}
            page={tablePage}
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
  /** Anchor to create a new user */
  linkToCreateNewUser: PropTypes.string,
  /** Function that shows a modal to import multiple users from a file */
  fnImportUsers: PropTypes.string,
  /** Anchor to view more information of the user */
  linkToViewUser: PropTypes.string,
  /** Anchor to edit information of the user */
  linkToEditUser: PropTypes.string,
  /** Function that shows a modal to delete a user from the registry */
  fnDeleteUser: PropTypes.func,
};

UsersManagementT.defaultProps = {
  className: '',
  data: { columns: [], rows: [] },
  tablePage: 1,
  linkToCreateNewUser: '',
  fnImportUsers: '',
  linkToViewUser: '',
  linkToEditUser: '',
  fnDeleteUser: null,
};

export default UsersManagementT;
