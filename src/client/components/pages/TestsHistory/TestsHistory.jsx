import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaEye as EyeIcon,
  FaDownload as DownloadIcon,
} from 'react-icons/fa';
import Table from '../../organisms/Table/Table';
import TestCard from '../../organisms/TestCard/TestCard';
import Button from '../../atoms/Button/Button';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';
import { listTests, downloadTests } from '../../../redux/user/user.actions.requests';
import { setSelectedTests, setEditingTest } from '../../../redux/user/user.actions';
import { viewTest } from '../../../routes/paths';

const TestsHistory = (props) => {
  const { history: { push } } = props;
  const dispatch = useDispatch();
  const { user, selectedTests } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.feedback);

  const [filteredTests, setFilteredTests] = useState(user ? user.tests : []);

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

  const handleOnSearch = (query) => {
    if (query) {
      setFilteredTests(filteredTests.filter(({ name }) => {
        return name.toUpperCase().includes(query.toUpperCase());
      }));
    } else {
      setFilteredTests(user.tests);
    }
  };

  const handleDownload = (tests) => () => {
    if (tests.length) {
      dispatch(downloadTests(user.id, tests));
    }
  };

  const handleViewTest = (editingTest) => () => {
    dispatch(setEditingTest({ editingTest }));
    push(viewTest());
  };

  useEffect(() => {
    dispatch(listTests(user));
  }, []);

  useEffect(() => {
    if (user) {
      setFilteredTests(user.tests);
    }
  }, [user]);

  return (
    <FeedbackProvider>
      <NavbarProvider>
        <MainViewProvider
          title='Historial de exámenes'
          showBottomLine
          moveTitle
          menu={(
            <>
              <Button
                className='--shadowed --spaced'
                onClick={handleDownload(user.tests.map(({ id }) => id))}
              >
                Descargar todo
              </Button>
              <Button
                className='--shadowed --spaced'
                onClick={handleDownload(selectedTests)}
              >
                Descargar selección
              </Button>
            </>
          )}
        >
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
                    disabled={status !== 'DONE'}
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
                      disabled={row.status !== 'DONE'}
                      onClick={handleViewTest(row)}
                    />
                    <Button
                      className='--shadowed --spaced'
                      type='icon'
                      icon={<DownloadIcon />}
                      iconMode='1'
                      disabled={row.status !== 'DONE'}
                      onClick={handleDownload([row.id])}
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
                onCheckboxChange={handleCheckboxOnChange(row.id)}
                selectedCheckbox={selectedTests.includes(row.id)}
                hideDeleteButton
                onView={handleViewTest(row)}
                disabledView={row.status !== 'DONE'}
                disabledDownload={row.status !== 'DONE'}
                disabledCheckbox={row.status !== 'DONE'}
                onDownload={handleDownload([row.id])}
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
  );
};

TestsHistory.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withUserData(withAuth(TestsHistory));
