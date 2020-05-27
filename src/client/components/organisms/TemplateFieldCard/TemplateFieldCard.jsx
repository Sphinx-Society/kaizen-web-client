import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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

import { colorError } from './TemplateFieldCard.scss';

const TemplateFieldCard = (props) => {
  const {
    onSubmit,
    onCancel,
  } = props;

  const editingField = useSelector((state) => state.templates.editingField);

  const ref = useRef(null);

  const [options, setOptions] = useState(editingField ? editingField.options : []);

  const initialFormState = editingField || {
    name: '',
    type: '',
    minLimit: '',
    maxLimit: '',
    unit: '',
    required: true,
  };

  const [{
    name,
    type,
    minLimit,
    maxLimit,
    unit,
    required,
  }, handleOnChange] = useForm(initialFormState);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...initialFormState,
      name,
      type,
      minLimit,
      maxLimit,
      unit,
      required,
      options,
    });
  };

  const types = [
    { label: 'Texto', value: 'string' },
    { label: 'Número', value: 'number' },
    { label: 'Opciones', value: 'options' },
    { label: 'Párrafo', value: 'text' },
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
        <div className='horizontal-flex-container'>
          <Button onClick={addOption}>Agregar opción</Button>
          <Button form='template-field-card' type='submit'>{editingField ? 'Guardar' : 'Agregar campo'}</Button>
        </div>
      );
    }
    return (
      <Button form='template-field-card' type='submit'>{editingField ? 'Guardar' : 'Agregar campo'}</Button>
    );
  };

  return (
    <PortalProvider>
      {() => {
        useOutsideClick(ref, onCancel);
        return (
          <form
            ref={ref}
            onSubmit={handleOnSubmit}
            id='template-field-card'
          >
            <Surface disableSpacing className='template-field-card'>
              <TextInput
                value={name}
                onChange={handleOnChange}
                placeholder='Nombre del campo'
                inputName='name'
                id='template-field-card-name'
                required
              />
              <Select
                value={type}
                onChange={handleSelectChange}
                placeholder='Tipo de campo'
                options={types}
                name='type'
                defaultOption='Selecciona un tipo'
                id='template-field-card-type'
                required
              />
              {type === 'number' && (
                <>
                  <TextInput
                    value={unit}
                    onChange={handleOnChange}
                    placeholder='Unidad'
                    inputName='unit'
                    id='template-field-card-unit'
                    required
                  />
                  <TextInput
                    value={minLimit}
                    onChange={handleOnChange}
                    placeholder='Desde'
                    inputName='minLimit'
                    id='template-field-card-min'
                    type='number'
                    required
                  />
                  <TextInput
                    value={maxLimit}
                    onChange={handleOnChange}
                    placeholder='Hasta'
                    inputName='maxLimit'
                    id='template-field-card-max'
                    type='number'
                    required
                  />
                </>
              )}
              {type === 'options' && (
                options.map(({ id, value }) => (
                  <div
                    className='horizontal-flex-container horizontal-flex-container--no-margin'
                    key={id}
                  >
                    <TextInput
                      value={value}
                      onChange={(event) => handleOptionValue(event.target.value, id)}
                      id={`template-field-card-option-${id}`}
                      placeholder={`Opción ${id}`}
                      required
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
              <div className='horizontal-flex-container'>
                <span>Campo requerido</span>
                <Checkbox
                  id='template-field-card-is-required'
                  onChange={handleOnChange}
                  name='required'
                  checked={required}
                />
              </div>
              <ButtonWrapper />
              <CloseIcon
                className='template-field-card__close'
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

TemplateFieldCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TemplateFieldCard;
