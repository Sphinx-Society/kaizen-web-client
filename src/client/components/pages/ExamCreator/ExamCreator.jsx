import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { IoMdAdd as AddIcon } from 'react-icons/io';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import ExamForm from '../../organisms/ExamForm/ExamForm';
import Button from '../../atoms/Button/Button';
import { setIsAddingField } from '../../../redux/exams/exams.actions';

const ExamCreator = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const goToManagerView = () => history.push('/exams-management');

  const addField = () => dispatch(setIsAddingField({ isAddingField: true }));

  return (
    <MainViewProvider
      showBackButton
      title='Crear examen'
      showBottomLine
      onBackButtonClick={goToManagerView}
      menu={<Button onClick={addField} icon={<AddIcon />}>Nuevo campo</Button>}
    >
      <ExamForm />
    </MainViewProvider>
  );
};

ExamCreator.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExamCreator;
