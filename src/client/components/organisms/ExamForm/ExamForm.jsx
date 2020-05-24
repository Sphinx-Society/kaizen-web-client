import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdAdd as AddIcon } from 'react-icons/io';
import TextInput from '../../atoms/TextInput/TextInput';
import Select from '../../atoms/Select/Select';
import Button from '../../atoms/Button/Button';
import ExamFieldCard from '../ExamFieldCard/ExamFieldCard';

import { setIsAddingField } from '../../../redux/exams/exams.actions';

import useForm from '../../../hooks/useForm/useForm';

import './ExamForm.scss';

const ExamForm = (props) => {
  const {
    onSubmit,
    submitButtonLabel,
    showAddButton,
  } = props;

  const dispatch = useDispatch();

  const isAddingField = useSelector((state) => state.exams.isAddingField);

  const [fields, setFields] = useState([]);

  const initialFormState = { name: '', type: '' };

  const [{ name, type }, handleOnChange, handleSubmit] = useForm(initialFormState, onSubmit);

  const closePortal = () => dispatch(setIsAddingField({ isAddingField: false }));

  const addField = (field) => {
    setFields([...fields, field]);
    closePortal();
  };

  return (
    <>
      <form
        className='exam-form'
        onSubmit={handleSubmit}
      >
        <TextInput
          inputName='name'
          onChange={handleOnChange}
          value={name}
          placeholder='Nombre del examen'
          id='name'
        />
        <Select
          name='type'
          onChange={handleOnChange}
          value={type}
          options={['Laboratorio']}
          placeholder='Categoría'
          defaultOption='Selecciona una categoría'
          id='type'
        />
        {showAddButton && (<Button icon={<AddIcon />}>Agregar Campo</Button>)}
        <Button
          type='submit'
          implementWrapper
        >
          {submitButtonLabel}
        </Button>
      </form>
      {isAddingField && (
        <ExamFieldCard
          onSubmit={addField}
          onCancel={closePortal}
        />
      )}
    </>
  );
};

ExamForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string,
  showAddButton: PropTypes.bool,
};

ExamForm.defaultProps = {
  showAddButton: false,
  submitButtonLabel: 'Crear',
};

export default ExamForm;
