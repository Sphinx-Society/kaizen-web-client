import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaPen as PenIcon,
  FaTrashAlt as TrashIcon,
  FaPlus as PlusIcon,
  FaFileCsv as FileImport,
} from 'react-icons/fa';

import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import ModalProvider from '../../providers/ModalProvider/ModalProvider';
import Button from '../../atoms/Button/Button';
import UserCard from '../../organisms/UserCard/UserCard';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import Table from '../../organisms/Table/Table';
import Select from '../../atoms/Select/Select';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';

import { setModalDialog } from '../../../redux/modalDialog/modalDialog.actions';
import { listUsers, deleUser } from '../../../redux/user/user.actions.requests';
import { setEditingUser } from '../../../redux/user/user.actions';
import { createUser } from '../../../routes/paths';

const UserManagement = (props) => {
  const { history: { push } } = props;

  const {
    users,
    totalPages,
    currentPage,
    totalUsers,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [activeRole, setActiveRole] = useState('');

  const { isLoading } = useSelector((state) => state.feedback);

  // Example
  const fnImportUsers = () => dispatch(setModalDialog({
    modal: {
      type: 'download',
      message: 'Desea importar archivos, en realidad sería un <Link />',
      mainFn: () => alert('Bajando archivo'),
    },
  }));

  // Example
  const fnDeleteUser = (name, id) => dispatch(setModalDialog({
    modal: {
      type: 'delete',
      message: `Desea eliminar al usuario ${name}`,
      mainFn: () => { dispatch(deleUser(id)); },
    },
  }));

  const gotToUserEditor = () => push(createUser());

  const handleNextPage = () => {
    const page = currentPage + 1;
    if (page <= totalPages) {
      dispatch(listUsers(page));
    }
  };

  const handlePrevPage = () => {
    const page = currentPage - 1;
    if (page >= 1) {
      dispatch(listUsers(page));
    }
  };

  const searchForUsers = (query) => {
    dispatch(listUsers(1, query, activeRole));
  };

  const searchForRole = (event) => {
    const { value } = event.target;
    setActiveRole(value);
    dispatch(listUsers(1, null, value));
  };

  const profiles = [
    { label: 'Médico', value: 'D' },
    { label: 'Bacteriólogo', value: 'L' },
    { label: 'Administrador', value: 'A' },
    { label: 'Paciente', value: 'P' },
  ];

  const handleEditUser = (editingUser) => () => {
    dispatch(setEditingUser({ editingUser }));
    gotToUserEditor();
  };
  const handleDeleteUser = (deletingUser) => () => {
    fnDeleteUser(deletingUser.name, deletingUser._id);

  };

  useEffect(() => {
    if (!users.length) {
      dispatch(listUsers());
    }
  }, []);

  const menu = () => (
    <div className='btn-menuT'>
      <Button
        color='secondary'
        icon={<FileImport size='1.2em' />}
        onClick={fnImportUsers}
      >
        Importar .csv
      </Button>
      <Button
        color='primary'
        icon={<PlusIcon size='1.2em' />}
        onClick={gotToUserEditor}
      >
        Crear usuario
      </Button>
      <Select
        options={profiles}
        defaultOption='Selecciona un rol'
        onChange={searchForRole}
        value={activeRole}
        placeholder='Busca un rol...'
        id='select-a-role-filter-select'
        name='role'
      />
    </div>
  );

  const mobileRow = (item) => (
    <UserCard
      className='users-management__user-card--surface'
      isAdminWhoView={true}
      onClickEdit={handleEditUser}
      onClickDelete={() => fnDeleteUser(item.id)}
      data={[
        { title: 'Rol', description: item.role },
        { title: 'Nombre', description: item.name },
        { title: 'User-name', description: item.username },
        { title: 'País', description: item.country },
        { title: 'Documento ID', description: item.document },
        { title: 'Fecha de creación', description: item.creationDate },
      ]}
    />
  );

  return (
    <ModalProvider>
      <FeedbackProvider>
        <NavbarProvider>
          <MainViewProvider
            title='Gestión de Usuarios'
            showBottomLine
            moveTitle
            menu={menu()}
          >
            <Table
              columns={[
                {
                  header: 'Nombre',
                  accessor: 'name',
                  id: 1,
                },
                {
                  header: 'Usuario',
                  accessor: 'username',
                  id: 2,
                },
                {
                  header: 'Rol',
                  accessor: 'role',
                  id: 3,
                },
                {
                  header: 'Pais',
                  accessor: 'country',
                  id: 4,
                },
                {
                  header: 'Documento',
                  accessor: 'document',
                  id: 5,
                },
                {
                  header: 'Fecha de creación',
                  accessor: 'creationDate',
                  id: 6,
                },
                {
                  header: '',
                  accessor: '',
                  cell: (row) => (
                    <div className='horizontal-flex-container'>
                      <Button
                        className='--shadowed --spaced'
                        type='icon'
                        icon={<PenIcon />}
                        iconMode='1'
                        onClick={handleEditUser(row)}
                      />
                      <Button
                        className='--shadowed --spaced'
                        type='icon'
                        onClick={handleDeleteUser(row)}
                        icon={<TrashIcon />}
                        iconMode='1'
                      />
                    </div>
                  ),
                  id: 7,
                },
              ]}
              rows={users}
              totalRows={totalUsers}
              page={currentPage}
              isLoading={isLoading}
              mobileRow={mobileRow}
              totalPages={totalPages}
              onNextPageClick={handleNextPage}
              onPrevPageClick={handlePrevPage}
              onSearch={searchForUsers}
            />
          </MainViewProvider>
        </NavbarProvider>
      </FeedbackProvider>
    </ModalProvider>
  );
};

UserManagement.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withUserData(withAuth(UserManagement));
