/* eslint-disable array-callback-return */
import React from 'react';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import withUserData from '../../hocs/withUserData';
import withAuth from '../../hocs/withAuth';

import useForm from '../../../hooks/useForm/useForm';

import './CreateUser.scss';

const FillExam = function (props) {
  const template = {
    _id: '5ecde051a79af923e27fa635',
    name: 'GLUCOSA EN SANGRE',
    type: 'EXAMEN DE LABORATORIO',
    fields: [
      {
        id: '0001',
        name: 'Nivel de glucosa',
        type: 'number',
        minLimit: 126.5,
        maxLimit: 150.8,
        unit: 'ml',
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
    ],
    active: true,
    insertedAt: 1590550609518,
  };

  const initialformState = {};
  const setInitialState = (initialformState) => {
    template.fields.map(({ id }) => Object.assign(initialformState, { [id]: '' }));
  };
  setInitialState(initialformState);
  const [stateProfile, handleOnChange] = useForm(initialformState);
  console.log(stateProfile);
  console.log(Object.entries(stateProfile)[0][1]);

  const RenderInputs = (field) => {
    console.log(field);
    if (field.type === 'number') {
      return (
        <TextInput
          placeholder={field.name.concat(` ${field.minLimit} - ${field.maxLimit} (${field.unit})`)}
        />
      );
    }
    return <p> es otro</p>;
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
          <div>
            {template.fields.map((field) => <RenderInputs {...field} />)}

          </div>

        </MainViewProvider>
      </FeedbackProvider>
    </NavbarProvider>
  );
};

export default withUserData(withAuth(FillExam));
