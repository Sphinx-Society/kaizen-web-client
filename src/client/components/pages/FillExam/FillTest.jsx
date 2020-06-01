import React from 'react';

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
import { patientTests, patientsManagement } from '../../../routes/paths';
import { getTemplate } from '../../../redux/templates/templates.actions.requests';
import { submitTestResults } from '../../../redux/user/user.actions.requests';

import './FillTest.scss';

const paintDynamicField = (field, state, handler) => {
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
          key={id}
          value={state[id]}
          inputName={id}
          onChange={handler}
          required={required}
          placeholder={name}
          id={id}
        />
      );
    }
    case 'number': {
      return (
        <TextInput
          key={id}
          value={state[id]}
          inputName={id}
          onChange={handler}
          required={required}
          min={minLimit}
          max={maxLimit}
          type='number'
          placeholder={name}
          id={id}
        />
      );
    }
    case 'select': {
      return (
        <Select
          key={id}
          options={field.options}
          value={state[id]}
          name={id}
          onChange={handler}
          required={required}
          placeholder={name}
          id={id}
        />
      );
    }
    case 'text': {
      return (
        <div
          key={id}
          className='textarea'
        >
          <label htmlFor={id}>{name}</label>
          <textarea

            value={state[id]}
            name={id}
            onChange={handler}
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
  const { history: { push } } = props;

  const dispatch = useDispatch();
  const { editingTest, patientUser } = useSelector((state) => state.user);
  const { editingTemplate } = useSelector((state) => state.templates);

  const goToPatientTests = () => push(patientTests());

  const getInitialResult = (fieldId) => editingTest.results.find(({ value, ...result }) => {
    const id = JSON.stringify({
      ...result,
      min: result.min || '',
      max: result.max || '',
      unit: result.unit || '',
    });

    return id === fieldId;
  });

  const initialFormState = () => {
    const initialForm = {};

    editingTemplate && editingTemplate.fields.forEach(({ id }) => {
      initialForm[id] = '';
      if (editingTest.results) {
        const result = getInitialResult(id);
        initialForm[id] = result ? result.value : '';
      }
    });

    return initialForm;
  };

  const [stateTest, handleOnChange] = useForm(initialFormState());

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const { testId } = editingTest;
    dispatch(submitTestResults(patientUser, testId, stateTest))
      .then(() => goToPatientTests());
  };

  if (!editingTest) {
    return (
      <Redirect to={patientsManagement()} />
    );
  }

  return (
    <NavbarProvider>
      <FeedbackProvider>
        <MainViewProvider
          showBackButton={true}
          onBackButtonClick={goToPatientTests}
          title={editingTemplate.name}
          showBottomLine
          moveTitle
        >
          <form
            id='test-form'
            className='test-form'
            onSubmit={handleOnSubmit}
          >
            <div className='fields-container'>
              {editingTemplate && editingTemplate.fields.map((field) => (
                paintDynamicField(field, stateTest, handleOnChange)
              ))}
            </div>
            <div>
              <Button
                data-test='login-form-button'
                color='primary'
                type='submit'
                form='test-form'
              >
                Guardar
              </Button>
            </div>
          </form>
        </MainViewProvider>
      </FeedbackProvider>
    </NavbarProvider>
  );
};

export default withUserData(withAuth(FillExam));
