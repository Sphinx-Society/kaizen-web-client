import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import Datepicker from '../../organisms/Datepicker/Datepicker';
import Select from '../../atoms/Select/Select';
import { getUser, updateProfile } from '../../../redux/user/user.actions.requests';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';
import { settings } from '../../../routes/paths';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import useForm from '../../../hooks/useForm/useForm';

import './UserProfile.scss';

const UserProfile = function (props) {
  const { history } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const { avatar } = user.profile;
  const submitCallback = (data) => {
    dispatch(updateProfile(data));
  };
  const [stateProfile, handleOnChange] = useForm(user, submitCallback);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    submitCallback(stateProfile);
  };
  return (
    <FeedbackProvider>
      <NavbarProvider>
        <MainViewProvider
          showBackButton={true}
          onBackButtonClick={() => {
            history.push(settings());
          }}
          title='Mi perfil'
          showBottomLine
          moveTitle
        // avatar={avatar}
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
                  value={stateProfile.lastName}
                  onChange={handleOnChange}
                />
                <Select
                  name='country'
                  id='country'
                  placeholder='País'
                  value={stateProfile.country}
                  onChange={handleOnChange}
                  options={['MX', 'COL']}
                />

                <TextInput
                  required
                  id='phone'
                  placeholder='Teléfono'
                  inputName='phone'
                  value={stateProfile.phone}
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
    </FeedbackProvider>

  );
};

export default withUserData(withAuth(UserProfile));
