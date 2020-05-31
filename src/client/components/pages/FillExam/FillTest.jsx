import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import Select from '../../atoms/Select/Select';
import TextInput from '../../atoms/TextInput/TextInput';
import withUserData from '../../hocs/withUserData';
import withAuth from '../../hocs/withAuth';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm/useForm';

import './FillTest.scss';

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
      name: 'Nivel de glucosa',
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

const FillExam = (props) => {
  const { history: { push } } = props;
  const dispatch = useDispatch();
  const RenderFields = (field) => {
    const submitCallback = (data) => {
      dispatch(login(data))
        .then(() => push(main()));
    };
    const [stateTest, handleOnChange] = useForm(initialForm, submitCallback);

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
          <form
            id='test-form'
            className='test-form'
            onSubmit={(event) => event.preventDefault()}
          >
            <div className='fields-container'>
              {template.fields.map((field) => <RenderFields key={field.id} {...field} />)}
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
