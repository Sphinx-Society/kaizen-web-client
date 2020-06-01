import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FaEye as EyeIcon, FaTrashAlt as DeleteIcon, FaPlus as PlusIcon } from 'react-icons/fa';

import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import ModalProvider from '../../providers/ModalProvider/ModalProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import Table from '../../organisms/Table/Table';
import Select from '../../atoms/Select/Select';
import Button from '../../atoms/Button/Button';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import ListReadableFields from '../../molecules/ListReadableFields/ListReadableFields';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import TestCard from '../../organisms/TestCard/TestCard';
import { setModalDialog } from '../../../redux/modalDialog/modalDialog.actions';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';

import { setPatientUser, setSelectedTests, setEditingTest } from '../../../redux/user/user.actions';
import { listTests, assignTest, deleteTestPending, publishTest } from '../../../redux/user/user.actions.requests';
import { listTemplates, getTemplate } from '../../../redux/templates/templates.actions.requests';

import { getStringFromDate } from '../../../utils/date';
import { patientsManagement, fillTest } from '../../../routes/paths';

const PatientTest = (props) => {
  const { history: { push } } = props;

  const [templatesToSelect, setTemplatesToSelect] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [templateToAssingFromSelected, setTemplateToAssingFromSelected] = useState(false);
  const [selectedExam, setSelectedExam] = useState('');

  const { isLoading } = useSelector((state) => state.feedback);
  const { user, patientUser, selectedTests } = useSelector((state) => state.user);

  if (!patientUser) {
    return (
      <Redirect to={patientsManagement()} />
    );
  }

  const {
    templates,
    currentPage: currentPageTemplate,
    totalPages: totalPagesTemplate,
  } = useSelector((state) => state.templates);

  const dispatch = useDispatch();
  const isRoleDoctor = user.role === 'doctor';
  const isRoleLab = user.role === 'lab';

  useEffect(() => {
    dispatch(setEditingTest({ editingTest: null }));
    dispatch(listTests(patientUser));

    if (isRoleDoctor) {
      dispatch(listTemplates());
    }
  }, []);

  // Load the list of templates to assign one to the patient by the role doctor
  useEffect(() => {
    if (isRoleDoctor) {
      const len = templatesToSelect.length;
      setTemplatesToSelect([
        ...templatesToSelect,
        ...templates.map((item, index) => ({ label: item.name, id: item._id, value: len + index })),
      ]);

      const page = currentPageTemplate + 1;
      if (page <= totalPagesTemplate) {
        dispatch(listTemplates(page));
      }
    }
  }, [templates]);

  // Update patient exams
  useEffect(() => {
    if (patientUser.tests) {
      setFilteredTests(patientUser.tests);
    }
  }, [patientUser.tests]);

  const handleOnSearch = (query) => {
    if (query) {
      setFilteredTests(filteredTests.filter(({ testName }) => {
        return testName.toUpperCase().includes(query.toUpperCase());
      }));
    } else {
      setFilteredTests(patientUser.tests);
    }
  };

  const searchForExam = (event) => {
    const { value } = event.target;
    setSelectedExam(value);
  };

  const fnAddTestToPatient = (index) => {
    const { label: testName, id: templateId } = templatesToSelect[index];
    dispatch(setModalDialog({
      modal: {
        type: 'confirm',
        mainFn: () => dispatch(assignTest(testName, templateId, patientUser)),
        message: (
          <span>
            Asignar examen:
            <br />
            <i>{testName}</i>
            <br />
            al paciente:
            <br />
            <i>
              {patientUser.firstName}
              {' '}
              {patientUser.lastName}
            </i>
          </span>
        ),
      },
    }));
  };

  const handleTestField = (editingTest) => () => {
    if (isRoleDoctor) {
      console.log('ver examen');
    }

    if (isRoleLab) {
      dispatch(setEditingTest({ editingTest }));
      dispatch(getTemplate(editingTest.templateId))
        .then(() => {
          push(fillTest());
        });
    };
  };

  const handlePublishTest = (test) => () => {
    dispatch(setModalDialog({ modal: {
      type: 'confirm',
      message: '¿Desea publicar el resultado?',
      mainFn: () => dispatch(publishTest(test, patientUser)),
    },
    }));
  };

  const handleDeleteTestPending = ({ testId }) => () => {
    dispatch(deleteTestPending(testId, patientUser));
  };

  const menu = () => (
    <Button
      color='primary'
      icon={<PlusIcon />}
      onClick={() => setTemplateToAssingFromSelected(true)}
    >
      Asignar Examen
    </Button>
  );

  return (
    <ModalProvider>
      <FeedbackProvider>
        <NavbarProvider>
          <MainViewProvider
            title={`Paciente: ${patientUser.firstName} ${patientUser.lastName}`}
            showBackButton
            lowerMore
            onBackButtonClick={() => {
              dispatch(setPatientUser({}));
              push(patientsManagement());
            }}
            showBottomLine
            menu={isRoleDoctor && menu()}
          >
            <div className='--surface-card'>
              <ListReadableFields>
                <ReadableField title='Nombre' description={patientUser.firstName} />
                <ReadableField title='Apellidos' description={patientUser.lastName} />
                <ReadableField title='Documento' description={patientUser.documentId} />
                <ReadableField title='Género' description={patientUser.gender} />
                <ReadableField title='país' description={patientUser.country} />
                <ReadableField title='Fecha de nacimiento' description={getStringFromDate(new Date(patientUser.birthDate))} />
              </ListReadableFields>
            </div>

            <section className='patient-tests-add-test'>
              {(templateToAssingFromSelected && isRoleDoctor)
              && (
                <div className='--surface-card'>
                  <br />
                  <Select
                    options={templatesToSelect}
                    defaultOption='Examen'
                    onChange={searchForExam}
                    value={selectedExam}
                    placeholder='Busca un examen'
                    id='select-a-exams-filter'
                    name='exams'
                  />
                  <Button
                    color='primary'
                    onClick={() => {
                      if (selectedExam) {
                        fnAddTestToPatient(selectedExam);
                      }
                      setTemplateToAssingFromSelected(false);
                    }}
                  >
                    Añadir
                  </Button>
                  <br />
                </div>
              )}
            </section>

            <Table
              isLoading={isLoading}
              columns={[
                {
                  header: isRoleLab ? 'Publicado' : '',
                  accessor: '',
                  cell: (row) => isRoleLab && (
                    <Checkbox
                      checked={selectedTests.includes(row.id)}
                      id={row.id}
                      onChange={handlePublishTest(row)}
                    />
                  ),
                  id: 0,
                  width: 'auto',
                  collapse: isRoleDoctor,
                },
                {
                  header: 'Estado',
                  accessor: 'statusLabel',
                  id: 1,
                },
                {
                  header: 'Fecha de asignación',
                  accessor: 'requestedAt',
                  id: 2,
                },
                {
                  header: 'Nombre del examen',
                  accessor: 'testName',
                  id: 3,
                },
                {
                  header: 'Asignado por',
                  accessor: 'doctorName',
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
                        icon={<EyeIcon />}
                        onClick={handleTestField(row)}
                        iconMode='1'
                        disabled={row.status.toLowerCase() !== 'done' && isRoleDoctor}
                      />
                      {(isRoleDoctor && row.status.toLowerCase() !== 'done') && (
                        <Button
                          className='--shadowed --spaced'
                          type='icon'
                          icon={<DeleteIcon />}
                          iconMode='1'
                          onClick={handleDeleteTestPending(row)}
                        />
                      )}
                    </div>
                  ),
                  id: 5,
                },
              ]}
              rows={filteredTests}
              totalRows={filteredTests.length}
              page={1}
              totalPages={1}
              mobileRow={(row) => (
                <TestCard
                  key={row.id}
                  name={row.name}
                  onCheckboxChange={handlePublishTest(row)}
                  selected={selectedTests.includes(row.id)}
                  {...row}
                />
              )}
              onNextPageClick={() => null}
              onPrevPageClick={() => null}
              onSearch={handleOnSearch}
            />
          </MainViewProvider>
        </NavbarProvider>
      </FeedbackProvider>
    </ModalProvider>
  );
};

PatientTest.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withUserData(withAuth(PatientTest));
