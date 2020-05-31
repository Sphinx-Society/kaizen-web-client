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
import FileInput from '../../atoms/FileInput/FileInput';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';

import { setModalDialog } from '../../../redux/modalDialog/modalDialog.actions';
import { listUsers, deleUser, createUsers } from '../../../redux/user/user.actions.requests';
import { setEditingUser, setFailedFilesLink } from '../../../redux/user/user.actions';
import { createUser } from '../../../routes/paths';

import './UsersManagement.scss';

const UsersManagement = (props) => {
  const { history: { push } } = props;

  const {
    users,
    totalPages,
    currentPage,
    totalUsers,
    failedFilesLink,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [activeRole, setActiveRole] = useState('');

  const [csvFileName, setCsvFileName] = useState('');
  const [csvFile, setCsvFile] = useState(null);

  const downloadFailedFiles = () => {
    failedFilesLink.click();
    dispatch(setFailedFilesLink({ failedFilesLink: null }));
    document.body.removeChild(failedFilesLink);
  };

  const handleFileInputOnChange = (event) => {
    const { files } = event.target;
    const file = files[0];

    if (file) {
      const fileName = file.name.replace(/\.[^/.]+$/, '');
      setCsvFileName(fileName);
      setCsvFile(file);
    }
  };

  const handleFileFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('users', csvFile);
    dispatch(createUsers(formData));
  };

  const [showCustomModal, setShowCustomModal] = useState(false);

  const { isLoading } = useSelector((state) => state.feedback);

  const handleAddMassiveUsers = () => {
    setShowCustomModal(true);
    dispatch(setModalDialog({
      modal: {
        type: 'upload',
        message: 'show modal',
      },
    }));
  };

  const handleDeleteUser = ({ name, id }) => () => {
    setShowCustomModal(false);
    dispatch(setModalDialog({
      modal: {
        type: 'delete',
        message: `Desea eliminar al usuario ${name}`,
        mainFn: () => { dispatch(deleUser(id)); },
      },
    }));
  };

  const gotToUserEditor = () => push(createUser());

  const handleNextPage = (query) => {
    const page = currentPage + 1;
    if (page <= totalPages) {
      dispatch(listUsers(page, query, activeRole));
    }
  };

  const handlePrevPage = (query) => {
    const page = currentPage - 1;
    if (page >= 1) {
      dispatch(listUsers(page, query, activeRole));
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

  useEffect(() => {
    if (!users.length) {
      dispatch(listUsers());
    }
  }, []);

  const menu = () => (
    <div className='users-management__admin-menu'>
      <Button
        color='secondary'
        icon={<FileImport size='1.2em' />}
        onClick={handleAddMassiveUsers}
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
        onChange={searchForRole}
        value={activeRole}
        placeholder='Selecciona un rol'
        id='select-a-role-filter-select'
        name='role'
      />
    </div>
  );

  const mobileRow = (item) => (
    <UserCard
      className='users-management__user-card--surface'
      isAdminWhoView={true}
      onClickMain={handleEditUser(item)}
      onClickDelete={handleDeleteUser(item)}
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

  const fileInput = () => (
    <form
      className='users-management__upload-csv-container'
      onSubmit={handleFileFormSubmit}
      id='users-management__upload-csv-form'
    >
      <p>
        Para crear usuarios masivamente
        es neceario un archivo .csv que contenga la información necesaria
      </p>
      <FileInput
        id='file-input-csv-users'
        onChange={handleFileInputOnChange}
        fileName={csvFileName}
        required
      />
      {failedFilesLink && (
        <div className='users-management__upload-csv-container__download-button'>
          <Button
            color='warning'
            onClick={downloadFailedFiles}
          >
            Descargar CSV con usuarios fallidos
          </Button>
        </div>
      )}
      <Button
        type='submit'
        form='users-management__upload-csv-form'
      >
        Subir
      </Button>
    </form>
  );

  return (
    <ModalProvider
      customModal={fileInput()}
      showCustomModal={showCustomModal}
    >
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

UsersManagement.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withUserData(withAuth(UsersManagement));
