import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  FaRegTimesCircle as CloseIcon,
  FaTrashAlt as TrashIcon,
} from 'react-icons/fa';
import PortalProvider from '../../providers/PortalProvider/PortalProvider';
import Surface from '../../atoms/Surface/Surface';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import Select from '../../atoms/Select/Select';
import Checkbox from '../../atoms/Checkbox/Checkbox';

import useForm from '../../../hooks/useForm/useForm';
import useOutsideClick from '../../../hooks/useOutsideClick/useOutsideClick';

import { colorError } from './ExamFieldCard.scss';

const ExamFieldCard = (props) => {
  const {
    onSubmit,
    onCancel,
  } = props;

  const ref = useRef(null);

  const [options, setOptions] = useState([]);

  const initialFormState = {
    name: '',
    type: '',
    placeholder: '',
    minLimit: '',
    maxLimit: '',
    unit: '',
    required: false,
  };

  const [{
    name,
    type,
    placeholder,
    minLimit,
    maxLimit,
    unit,
    required,
  }, handleOnChange, handleSubmit] = useForm(initialFormState, onSubmit);

  const types = [
    { label: 'Texto', value: 'text' },
    { label: 'Número', value: 'number' },
    { label: 'Opciones', value: 'options' },
    { label: 'Párrafo', value: 'parragraph' },
    { label: 'Archivo', value: 'file' },
  ];

  const handleOptionValue = (value, id) => setOptions((prevState) => {
    const state = prevState.map((opt) => {
      if (opt.id === id) {
        return { ...opt, value };
      }
      return opt;
    });
    return state;
  });

  const deleteOption = (id) => () => setOptions((prevState) => {
    const state = prevState.filter((opt) => opt.id !== id);
    return state;
  });

  const addOption = () => {
    if (!options.length) {
      setOptions([{ value: '', id: 1 }]);
    } else {
      const id = Math.max(...options.map(({ id }) => id)) + 1;
      const opts = [...options, { value: '', id }];
      setOptions(opts);
    }
  };

  const resetOptions = () => setOptions([]);

  const handleSelectChange = (event) => {
    resetOptions();
    handleOnChange(event);
  };

  const ButtonWrapper = () => {
    if (type === 'options') {
      return (
        <div className='exam-field-card__flex-container'>
          <Button onClick={addOption}>Agregar opción</Button>
          <Button form='exam-field-card' type='submit'>Agregar campo</Button>
        </div>
      );
    }
    return (
      <Button form='exam-field-card' type='submit'>Agregar campo</Button>
    );
  };

  return (
    <PortalProvider>
      {() => {
        useOutsideClick(ref, onCancel);
        return (
          <form
            ref={ref}
            onSubmit={handleSubmit}
            id='exam-field-card'
          >
            <Surface disableSpacing className='exam-field-card'>
              <TextInput
                value={name}
                onChange={handleOnChange}
                placeholder='Nombre del campo'
                inputName='name'
                id='exam-field-card-name'
              />
              <TextInput
                value={placeholder}
                onChange={handleOnChange}
                placeholder='Etiqueta'
                inputName='placeholder'
                id='exam-field-card-placeholder'
              />
              <Select
                value={type}
                onChange={handleSelectChange}
                placeholder='Tipo de campo'
                options={types}
                name='type'
                defaultOption='Selecciona un tipo'
                id='exam-field-card-type'
              />
              {type === 'number' && (
                <>
                  <TextInput
                    value={unit}
                    onChange={handleOnChange}
                    placeholder='Unidad'
                    inputName='unit'
                    id='exam-field-card-unit'
                  />
                  <TextInput
                    value={minLimit}
                    onChange={handleOnChange}
                    placeholder='Desde'
                    inputName='minLimit'
                    id='exam-field-card-min'
                    type='number'
                  />
                  <TextInput
                    value={maxLimit}
                    onChange={handleOnChange}
                    placeholder='Hasta'
                    inputName='maxLimit'
                    id='exam-field-card-max'
                    type='number'
                  />
                </>
              )}
              {type === 'options' && (
                options.map(({ id, value }) => (
                  <div
                    className='exam-field-card__flex-container exam-field-card__flex-container--no-margin'
                    key={id}
                  >
                    <TextInput
                      value={value}
                      onChange={(event) => handleOptionValue(event.target.value, id)}
                      id={`exam-field-card-option-${id}`}
                      placeholder={`Opción ${id}`}
                    />
                    <Button
                      icon={<TrashIcon size='1em' />}
                      type='icon'
                      iconMode='1'
                      className='--shadowed'
                      onClick={deleteOption(id)}
                    />
                  </div>
                ))
              )}
              <div className='exam-field-card__flex-container'>
                <span>Campo requerido</span>
                <Checkbox
                  id='exam-field-card-is-required'
                  onChange={handleOnChange}
                  name='required'
                  checked={required}
                />
              </div>
              <ButtonWrapper />
              <CloseIcon
                className='exam-field-card__close'
                color={colorError}
                size='1.5em'
                onClick={onCancel}
              />
            </Surface>
          </form>
        );
      }}
    </PortalProvider>
  );
};

ExamFieldCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ExamFieldCard;
