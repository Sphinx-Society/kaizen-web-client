import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaPen as PenIcon,
  FaTrashAlt as TrashIcon,
} from 'react-icons/fa';
import TextInput from '../../atoms/TextInput/TextInput';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import Select from '../../atoms/Select/Select';
import Button from '../../atoms/Button/Button';
import TemplateFieldCard from '../TemplateFieldCard/TemplateFieldCard';

import { setIsAddingField, setEditingField } from '../../../redux/templates/templates.actions';

import useForm from '../../../hooks/useForm/useForm';

import './TemplateForm.scss';

const TemplateForm = (props) => {
  const {
    onSubmit,
    submitButtonLabel,
  } = props;

  const dispatch = useDispatch();

  const {
    isAddingField,
    editingTemplate,
  } = useSelector((state) => state.templates);

  const { isLoading } = useSelector((state) => state.feedback);

  const [fields, setFields] = useState(editingTemplate ? editingTemplate.fields : []);

  const initialFormState = editingTemplate || { name: '', type: '' };

  const [{ name, type }, handleOnChange] = useForm(initialFormState);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let data = { name, type, fields };
    if (editingTemplate) {
      data = { ...editingTemplate, ...data };
    }
    onSubmit(data);
  };

  const resetEditingField = () => dispatch(setEditingField({ editingField: null }));

  const closePortal = () => {
    dispatch(setIsAddingField({ isAddingField: false }));
    resetEditingField();
  };

  const addField = (field) => {
    if (!fields.length) {
      setFields([{ ...field, id: 1 }]);
    } else {
      const id = Math.max(...fields.map(({ id }) => id)) + 1;
      const opts = [...fields, { ...field, id }];
      setFields(opts);
    }
  };

  const changeField = (field) => {
    setFields((prevState) => {
      const state = prevState.map((item) => {
        if (item.id === field.id) {
          return { ...field };
        }
        return item;
      });
      return state;
    });
  };

  const addOrChangeField = (field) => {
    if (field.id) {
      changeField(field);
    } else {
      addField(field);
    }
    closePortal();
    resetEditingField();
  };

  const editField = (editingField) => () => {
    dispatch(setEditingField({ editingField }));
    dispatch(setIsAddingField({ isAddingField: true }));
  };

  const deleteField = (id) => () => setFields((prevState) => {
    const state = prevState.filter((item) => item.id !== id);
    return state;
  });

  return (
    <>
      <form
        className='template-form'
        id='template-form'
        onSubmit={handleOnSubmit}
      >
        <div className='template-form__principals'>
          <TextInput
            inputName='name'
            onChange={handleOnChange}
            value={name}
            placeholder='Nombre de la plantilla'
            id='name'
            required
          />
          <Select
            name='type'
            onChange={handleOnChange}
            value={type}
            options={['Laboratorio']}
            placeholder='Categoría'
            defaultOption='Selecciona una categoría'
            id='type'
            required
          />
        </div>
        {fields.map((field) => (
          <div
            className='horizontal-flex-container'
            key={field.id}
          >
            <ReadableField
              title={field.name}
            />
            <div>
              <Button
                icon={<TrashIcon size='1em' />}
                type='icon'
                iconMode='1'
                className='--shadowed --spaced'
                onClick={deleteField(field.id)}
              />
              <Button
                icon={<PenIcon size='1em' />}
                type='icon'
                iconMode='1'
                className='--shadowed --spaced'
                onClick={editField(field)}
              />
            </div>
          </div>
        ))}
        <Button
          type='submit'
          form='template-form'
          className='--is-for-submit'
          disabled={isLoading}
        >
          {submitButtonLabel}
        </Button>
      </form>
      {isAddingField && (
        <TemplateFieldCard
          onSubmit={addOrChangeField}
          onCancel={closePortal}
        />
      )}
    </>
  );
};

TemplateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string,
};

TemplateForm.defaultProps = {
  submitButtonLabel: 'Crear',
};

export default TemplateForm;
