import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import Select from '../../atoms/Select/Select';
import TextInput from '../../atoms/TextInput/TextInput';
import withUserData from '../../hocs/withUserData';
import withAuth from '../../hocs/withAuth';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm/useForm';
import { patientsManagement } from '../../../routes/paths';
import { getTemplate } from '../../../redux/templates/templates.actions.requests';
import { getMedicalTestTemplate } from '../../../redux/user/user.actions.requests';

import './FillTest.scss';

const initialForm = {};

const initialFormState = () => {

  template.fields.forEach(({ id }) => {
    initialForm[id] = '';
  });
};

initialFormState();
const RenderFields = (field) => {

  const [stateTest, handleOnChange] = useForm(initialForm);
  const {
    type,
    id,
    required,
    minLimit,
    maxLimit,
    name,
  } = field;

  switch (type) {
    case 'string': {
      return (
        <TextInput
          value={stateTest[id]}
          inputName={id}
          onChange={handleOnChange}
          required={required}
          placeholder={name}
          id={id}
        />
      );
    }
    case 'number': {
      return (
        <TextInput
          value={stateTest[id]}
          inputName={id}
          onChange={handleOnChange}
          required={required}
          min={minLimit}
          max={maxLimit}
          type='number'
          placeholder={name}
          id={id}
        />
      );
    }
    case 'options': {
      return (
        <Select
          options={field.options}
          value={stateTest[id]}
          name={id}
          onChange={handleOnChange}
          required={required}
          placeholder={name}
          id={id}
        />
      );
    }
    case 'text': {
      return (
        <div className='textarea'>
          <label htmlFor={id}>{name}</label>
          <textarea

            value={stateTest[id]}
            name={id}
            onChange={handleOnChange}
            required={required}
            placeholder={name}
            id={id}
          />
        </div>
      );
    }
    default: return null;
  }
};
const FillExam = (props) => {
  const dispatch = useDispatch();
  const { testId, patientId } = useSelector((state) => state.user.editingTest);
  const template = useSelector((state) => state.user.editingTemplate);

  if (!testId || !patientId) {
    return (
      <Redirect to={patientsManagement()} />
    );
  }
  useEffect(() => {
    dispatch(getMedicalTestTemplate(patientId, testId));
  }, []);
  const { history: { push } } = props;
  return (
    <NavbarProvider>
      <FeedbackProvider>
        <MainViewProvider
          showBackButton={true}
          onBackButtonClick={() => push(patientsManagement())}
          title={template.name}
          showBottomLine
          moveTitle
        >
          <form
            id='test-form'
            className='test-form'
          >
            <div className='fields-container'>
              {template && template.fields.map((field) => <RenderFields key={field.id} {...field} />)}
            </div>
            <Button
              data-test='login-form-button'
              color='primary'
              type='submit'
              form='test-form'
            >
              Publicar resultados
            </Button>
          </form>
        </MainViewProvider>
      </FeedbackProvider>
    </NavbarProvider>
  );
};

export default withUserData(withAuth(FillExam));
