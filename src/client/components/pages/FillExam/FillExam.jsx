import React from 'react';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import Select from '../../atoms/Select/Select';
import TextInput from '../../atoms/TextInput/TextInput';
import withUserData from '../../hocs/withUserData';
import withAuth from '../../hocs/withAuth';

import useForm from '../../../hooks/useForm/useForm';

import './CreateUser.scss';

const template = {
  _id: '5ecde051a79af923e27fa635',
  name: 'GLUCOSA EN SANGRE',
  type: 'EXAMEN DE LABORATORIO',
  fields: [
    {
      id: '0001',
      name: 'Nivel de glucosa',
      type: 'string',
      options: [],
      required: false,
    },
    {
      id: '0002',
      name: 'Nivel de amor',
      type: 'number',
      minLimit: 126.5,
      maxLimit: 150.8,
      unit: 'ml',
      options: [],
      required: false,
    },
    {
      id: '0003',
      name: 'Tipo de sangre',
      type: 'options',
      options: ['Camp1', 'Camp2'],
      required: true,
    },
    {
      id: '0004',
      name: 'Recomendaciones',
      type: 'text',
      options: [],
      required: true,
    },
  ],
  active: true,
  insertedAt: 1590550609518,
};

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
        <textarea
          value={stateTest[id]}
          name={id}
          onChange={handleOnChange}
          required={required}
          placeholder={name}
          id={id}
        />
      );
    }
    default: return null;
  }
};

const FillExam = () => {
  return (
    <NavbarProvider>
      <FeedbackProvider>
        <MainViewProvider
          showBackButton={true}
          onBackButtonClick={() => null}
          title={template.name}
          showBottomLine
          moveTitle
        >
          <form onSubmit={(event) => event.preventDefault()}>
            {template.fields.map((field) => <RenderFields key={field.id} {...field} />)}
            <button type='submit'>submit</button>
          </form>
        </MainViewProvider>
      </FeedbackProvider>
    </NavbarProvider>
  );
};

export default withUserData(withAuth(FillExam));
