import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye as EyeIcon, FaDownload as DownloadIcon, FaPlus as PlusIcon } from 'react-icons/fa';

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

import { setPatientUser, setSelectedTests } from '../../../redux/user/user.actions';
import { listTests, assingTest } from '../../../redux/user/user.actions.requests';
import { listTemplates } from '../../../redux/templates/templates.actions.requests';

import { getStringFromDate } from '../../../utils/date';
import { patientsManagement } from '../../../routes/paths';

const PatientTest = (props) => {
  const { history: { push } } = props;
  const dispatch = useDispatch();
  const { patientUser, selectedTests } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.feedback);
  const {
    templates,
    currentPage: currentPageTemplate,
    totalPages: totalPagesTemplate,
  } = useSelector((state) => state.templates);

  const [templatesToSelect, setTemplatesToSelect] = useState([]);
  const [filteredTests, setFilteredTests] = useState(patientUser.tests ? patientUser.tests : []);

  const handleCheckboxOnChange = (id) => (event) => {
    const { checked } = event.target;
    if (checked) {
      dispatch(setSelectedTests({ selectedTests: [...selectedTests, id] }));
    } else {
      dispatch(setSelectedTests({
        selectedTests: selectedTests.filter((testId) => testId !== id),
      }));
    }
  };

  useEffect(() => {
    dispatch(listTests(patientUser));
    dispatch(listTemplates());
  }, []);

  useEffect(() => {
    const len = templatesToSelect.length;
    setTemplatesToSelect([
      ...templatesToSelect,
      ...templates.map((item, index) => ({ label: item.name, id: item._id, value: len + index })),
    ]);

    const page = currentPageTemplate + 1;
    if (page <= totalPagesTemplate) {
      dispatch(listTemplates(page));
    }
  }, [templates]);

  useEffect(() => {
    if (patientUser.tests) {
      setFilteredTests(patientUser.tests);
    }
  }, [patientUser]);

  const handleOnSearch = (query) => {
    if (query) {
      setFilteredTests(filteredTests.filter(({ name }) => {
        return name.toUpperCase().includes(query.toUpperCase());
      }));
    } else {
      setFilteredTests(patientUser.tests);
    }
  };

  const fnAddTestToPatient = (index) => dispatch(setModalDialog({
    modal: {
      type: 'confirm',
      message: 'Asignar el examen XXXXX al paciente XXXXX',
      mainFn: () => dispatch(
        assingTest(
          templatesToSelect[index].label, templatesToSelect[index].id, patientUser.id,
        ),
      ),
    },
  }));

  const [activeSearchTemplateToAssing, setActiveSearchTemplateToAssing] = useState(false);
  const [selectedExam, setSelectedExam] = useState('');

  const searchForExam = (event) => {
    const { value } = event.target;
    setSelectedExam(value);
  };

  const menu = () => (
    <>
      <Button
        color='primary'
        icon={<PlusIcon size='1.2em' />}
        onClick={() => setActiveSearchTemplateToAssing(true)}
      >
        Asignar Examen
      </Button>
    </>
  );

  return (
    <ModalProvider>
      <FeedbackProvider>
        <NavbarProvider>
          <MainViewProvider
            title={`Paciente: ${patientUser.firstName} ${patientUser.lastName}`}
            showBackButton
            onBackButtonClick={() => {
              dispatch(setPatientUser({}));
              push(patientsManagement());
            }}
            showBottomLine
            moveTitle
            lowerMore
            menu={menu()}
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
              {activeSearchTemplateToAssing
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
                      setActiveSearchTemplateToAssing(false);
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
                  header: '',
                  accessor: '',
                  cell: ({ id, status }) => (
                    <Checkbox
                      onChange={handleCheckboxOnChange(id)}
                      checked={selectedTests.includes(id)}
                      disabled={status !== 'done'}
                      id={id}
                    />
                  ),
                  id: 0,
                  width: '30px',
                  collapse: true,
                },
                {
                  header: 'Nombre del examen',
                  accessor: 'name',
                  id: 1,
                },
                {
                  header: 'Asignado por',
                  accessor: 'doctorName',
                  id: 2,
                },
                {
                  header: 'Estado',
                  accessor: 'statusLabel',
                  id: 3,
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
                        iconMode='1'
                      />
                      <Button
                        className='--shadowed --spaced'
                        type='icon'
                        icon={<DownloadIcon />}
                        iconMode='1'
                      />
                    </div>
                  ),
                  id: 4,
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
                  onCheckboxChange={handleCheckboxOnChange(row.id)}
                  // selected={selectedTests.includes(row.id)}
                  disabled={row.status !== 'done'}
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

PatientTest.propTypes = {};

export default withUserData(withAuth(PatientTest));
