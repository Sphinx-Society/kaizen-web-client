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

const UserProfile = function (props) {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { avatar } = user.profile;
  const { history: { push } } = props;
  const goToSettingsView = () => push(settings());
  const { profile } = user || { profile: '', auth: '' };
  const submitCallback = (data) => dispatch(setUserProfile(data));

  const [stateProfile, handleOnChange] = useForm(profile);
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
        title='Mi perfil'
        showBottomLine
        moveTitle
        avatar={avatar}
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
                id='1'
                placeholder='Apellido'
                inputName='lastName'
                value={stateProfile.lastName}
                onChange={handleOnChange}
              />
              <TextInput
                required
                id='3'
                placeholder='Identificación'
                inputName='documentId'
                value={stateProfile.documentId}
                onChange={handleOnChange}
              />

              <TextInput
                required
                id='6'
                placeholder='Teléfono'
                inputName='phoneNumber'
                value={stateProfile.phoneNumber}
                onChange={handleOnChange}
              />
              <Select
                name='gender'
                id='8'
                placeholder='Genero'
                value={stateProfile.gender}
                onChange={handleOnChange}
                options={['M', 'F', 'Other']}
              />
              <Datepicker
                placeholder='Fecha de nacimiento'
                name='birthDate'
                onChange={handleOnChange}
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

export default UserProfile;
