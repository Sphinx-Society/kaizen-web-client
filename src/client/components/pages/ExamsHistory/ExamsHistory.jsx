import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaEye as EyeIcon,
  FaDownload as DownloadIcon,
} from 'react-icons/fa';
import Table from '../../organisms/Table/Table';
import ExamCard from '../../organisms/ExamCard/ExamCard';
import Button from '../../atoms/Button/Button';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import { listExams } from '../../../redux/exams/exams.actions.requests';
import { setSelectedExams } from '../../../redux/exams/exams.actions';

import { getStringFromDate } from '../../../utils/date';
import { templateEditor } from '../../../routes/paths';

const ExamsHistory = (props) => {
  const { history } = props;

  const dispatch = useDispatch();
  const { exams, selectedExams } = useSelector((state) => state.exams);
  const { isLoading } = useSelector((state) => state.feedback);

  const handleCheckboxOnChange = (id) => (event) => {
    const { checked } = event.target;
    if (checked) {
      dispatch(setSelectedExams({ selectedExams: [...selectedExams, id] }));
    } else {
      dispatch(setSelectedExams({
        selectedExams: selectedExams.filter((examId) => examId !== id),
      }));
    }
  };

  useEffect(() => {
    dispatch(listExams());
  }, []);

  const editTe = () => {};

  return (
    <FeedbackProvider>
      <NavbarProvider>
        <MainViewProvider
          title='Historial de exámenes'
          showBottomLine
          moveTitle
          menu={(
            <>
              <Button className='--shadowed --spaced'>Descargar todo</Button>
              <Button className='--shadowed --spaced'>Descargar selección</Button>
            </>
          )}
        >
          <Table
            isLoading={isLoading}
            columns={[
              {
                header: '',
                accessor: '',
                cell: ({ id }) => (
                  <Checkbox
                    onChange={handleCheckboxOnChange(id)}
                    checked={selectedExams.includes(id)}
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
                header: 'Categoría',
                accessor: 'type',
                id: 2,
              },
              {
                header: 'Fecha de asignación',
                accessor: 'creationDate',
                cell: (row) => <span>{getStringFromDate(new Date(row.creationDate))}</span>,
                id: 3,
              },
              {
                header: 'Estado',
                accessor: 'state',
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
                id: 5,
              },
            ]}
            rows={exams}
            totalRows={exams.length}
            page={0}
            mobileRow={(row) => (
              <ExamCard
                key={row.id}
                onCheckboxChange={handleCheckboxOnChange(row.id)}
                {...row}
              />
            )}
          />
        </MainViewProvider>
      </NavbarProvider>
    </FeedbackProvider>
  );
};

ExamsHistory.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExamsHistory;
