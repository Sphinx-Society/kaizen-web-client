import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import Datepicker from '../../organisms/Datepicker/Datepicker';
import Select from '../../atoms/Select/Select';
import { usersManagement } from '../../../routes/paths';
import { createUser, updateUser } from '../../../redux/user/user.actions.requests';
import { setEditingUser } from '../../../redux/user/user.actions';

import useForm from '../../../hooks/useForm/useForm';

import './UserProfile.scss';

const CreateUser = function (props) {
  const editingUserStore = useSelector((state) => state.user.editingUser);

  const setUserStore = (editingUserStore) => {
    if (editingUserStore) {
      const { profile: { firstName, lastName, birthDate, phoneNumber, avatar, gender, country, documentId }, auth: { email, role }, _id } = editingUserStore;
      const editingUser = {
        firstName, lastName, birthDate, phoneNumber, avatar, gender, country, documentId, email, role, id: _id,
      };
      return editingUser;
    }
    const newUserData = {
      firstName: '',
      lastName: '',
      documentId: '',
      country: 'default',
      gender: 'default',
      email: '',
      phoneNumber: '',
    };
    return newUserData;
  };

  const dispatch = useDispatch();
  const { history: { push } } = props;

  const initialformState = setUserStore(editingUserStore);

  const [stateProfile, handleOnChange] = useForm(initialformState);
  const submitCallback = (data) => {
    if (editingUserStore) {
      dispatch(updateUser(data));

    } else {
      dispatch(createUser(data));
    }
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    submitCallback(stateProfile);
    push(usersManagement());
  };
  const profiles = [
    { label: 'Médico', value: 'doctor' },
    { label: 'Laboratorista', value: 'lab' },
    { label: 'Administrador', value: 'admin' },
    { label: 'Paciente', value: 'patient' },
  ];
  return (
    <NavbarProvider>
      <MainViewProvider
        showBackButton={true}
        onBackButtonClick={() => {
          dispatch(setEditingUser({}));
          push(usersManagement());

        }}
        title={editingUserStore ? 'Editar usuario' : 'Crear usuario'}
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
                id='phoneNumber'
                placeholder='Teléfono'
                inputName='phoneNumber'
                value={stateProfile.phoneNumber}
              />
              <Select
                onChange={handleOnChange}
                required
                name='gender'
                id='gender'
                placeholder='Genero'
                value={stateProfile.gender}
                options={['M', 'F', 'Other']}
              />
              <Select
                onChange={handleOnChange}
                required
                name='country'
                id='country'
                placeholder='País'
                value={stateProfile.country}
                options={['MX', 'COL']}
              />
              <TextInput
                required
                disabled={Boolean(editingUserStore)}
                id='documentId'
                placeholder='Identificación'
                inputName='documentId'
                value={stateProfile.documentId}
                onChange={handleOnChange}
              />
              <TextInput
                onChange={handleOnChange}
                type='email'
                required
                id='email'
                placeholder='Correo electrónico'
                inputName='email'
                value={stateProfile.email}
              />
              <Select
                onChange={handleOnChange}
                required
                name='role'
                id='role'
                placeholder='Rol'
                value={stateProfile.role}
                options={profiles}
              />
              <Datepicker
                onChange={handleOnChange}
                required
                placeholder='Fecha de nacimiento'
                name='birthDate'
                value={stateProfile.birthDate}
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
