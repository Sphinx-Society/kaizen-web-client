import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import Datepicker from '../../organisms/Datepicker/Datepicker';
import Select from '../../atoms/Select/Select';
import { settings, userProfile } from '../../../routes/paths';

import useForm from '../../../hooks/useForm/useForm';
import { setUserProfile } from '../../../redux/user/user.actions.requests';

import './UserProfile.scss';

const CreateUser = function (props) {

  const dispatch = useDispatch();
  const { history: { push } } = props;
  const goToSettingsView = () => push(settings());
  const newUserData = {
    firstName: '',
    lastName: '',
    documentId: '',
    country: '',
    gender: '',
    email: '',
    phoneNumber: '',
  };
  const submitCallback = (data) => dispatch(setUserProfile(data));

  const [stateProfile, handleOnChange] = useForm(newUserData);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    submitCallback(stateProfile);
    push(settings());
  };
  return (
    <NavbarProvider>
      <MainViewProvider
        showBackButton={true}
        onBackButtonClick={() => {
          goToSettingsView();
        }}
        title='Crear usuario'
        showBottomLine
        moveTitle
      >
        <div>
          <form
            id='user-form'
            className='user-form'
            onSubmit={handleOnSubmit}
          >
            <div className='user-form__inputs-container'>
              <TextInput
                required
                id='firstName'
                placeholder='Nombre'
                inputName='firstName'
                value={stateProfile.firstName}
                onChange={handleOnChange}
              />
              <TextInput
                required
                id='lastName'
                placeholder='Apellido'
                inputName='lastName'
                onChange={handleOnChange}
                value={stateProfile.lastName}
              />
              <TextInput

                onChange={handleOnChange}

                required
                id='documentId'
                placeholder='Identificación'
                inputName='documentId'
                value={stateProfile.documentId}
              />
              <Select
                onChange={handleOnChange}

                name='country'
                id='country'
                placeholder='País'
                value={stateProfile.country}
                options={['MX', 'COL']}
              />
              <Datepicker
                onChange={handleOnChange}

                placeholder='Fecha de nacimiento'
                name='birthDate'
                value={stateProfile.birthDate}
              />
              <Select
                onChange={handleOnChange}

                name='gender'
                id='gender'
                placeholder='Genero'
                value={stateProfile.gender}
                options={['M', 'F', 'Other']}
              />
              <TextInput
                onChange={handleOnChange}

                required
                id='email'
                placeholder='Correo electrónico'
                inputName='email'
                value={stateProfile.email}
              />
              <TextInput
                onChange={handleOnChange}

                required
                id='phoneNumber'
                placeholder='Teléfono'
                inputName='phoneNumber'
                value={stateProfile.phoneNumber}
              />
            </div>
            <Button
              form='user-form'
              className='--is-for-submit'
              onClick={() => null}
              color='primary'
              type='submit'
            >
              Guardar cambios
            </Button>
          </form>
        </div>

      </MainViewProvider>
    </NavbarProvider>
  );
};

export default CreateUser;
