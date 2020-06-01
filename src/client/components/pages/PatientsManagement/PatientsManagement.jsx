import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye as ViewIcon } from 'react-icons/fa';

import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import ModalProvider from '../../providers/ModalProvider/ModalProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import UserCard from '../../organisms/UserCard/UserCard';
import Table from '../../organisms/Table/Table';
import Button from '../../atoms/Button/Button';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';

import { listUsers } from '../../../redux/user/user.actions.requests';
import { setPatientUser, setUsers } from '../../../redux/user/user.actions';

import { patientTests } from '../../../routes/paths';

const PatientsManagement = (props) => {
  const { history: { push } } = props;

  const { isLoading } = useSelector((state) => state.feedback);
  const {
    users,
    totalPages,
    currentPage,
    totalUsers,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const gotToPatientTests = () => push(patientTests());

  const searchForUsers = (query) => dispatch(listUsers(1, query));

  const handleViewPatient = (patient) => () => {
    dispatch(setPatientUser({ patientUser: { ...patient.profile, id: patient.id } }));
    gotToPatientTests();
  };

  const handleNextPage = (query) => {
    const page = currentPage + 1;
    if (page <= totalPages) {
      dispatch(listUsers(page, query));
    }
  };

  const handlePrevPage = (query) => {
    const page = currentPage - 1;
    if (page >= 1) {
      dispatch(listUsers(page, query));
    }
  };

  const mobileRow = (item) => (
    <UserCard
      className='patients-management__user-card--surface'
      isAdminWhoView={false}
      onClickMain={handleViewPatient(item)}
      onClickMainIcon='view'
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

  useEffect(() => {
    if (!users.length) {
      dispatch(listUsers());
    }
  }, []);

  return (
    <ModalProvider>
      <FeedbackProvider>
        <NavbarProvider>
          <MainViewProvider
            title='Pacientes'
            showBottomLine
            moveTitle
          >
            <Table
              columns={[
                {
                  header: 'Nombre',
                  accessor: 'name',
                  id: 1,
                },
                {
                  header: 'País',
                  accessor: 'country',
                  id: 2,
                },
                {
                  header: 'Documento',
                  accessor: 'document',
                  id: 3,
                },
                {
                  header: 'Fecha de creación',
                  accessor: 'creationDate',
                  id: 4,
                },
                {
                  header: '',
                  accessor: '',
                  cell: (row) => (
                    <div className='horizontal-flex-container'>
                      <Button
                        className='--shadowed --spaced'
                        type='icon'
                        icon={<ViewIcon />}
                        iconMode='1'
                        onClick={handleViewPatient(row)}
                      />
                    </div>
                  ),
                  id: 5,
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

PatientsManagement.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withUserData(withAuth(PatientsManagement));
