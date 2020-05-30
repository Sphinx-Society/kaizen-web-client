import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import Datepicker from '../../organisms/Datepicker/Datepicker';
import Select from '../../atoms/Select/Select';
import { updateProfile } from '../../../redux/user/user.actions.requests';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';
import { settings } from '../../../routes/paths';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import useForm from '../../../hooks/useForm/useForm';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import { getStringFromDate } from '../../../utils/date';
import ListReadableFields from '../../molecules/ListReadableFields/ListReadableFields';
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
        >
          <div className='user-profile-container'>
            <ListReadableFields>
              <ReadableField
                title='Nombres'
                description={stateProfile.firstName}
              />
              <ReadableField
                title='Apellidos'
                description={stateProfile.lastName}
              />
              <ReadableField
                title='Rol'
                description={stateProfile.role}
              />
              <ReadableField
                title='Usuario'
                description={stateProfile.username}
              />
              <ReadableField
                title='Identificación'
                description={stateProfile.document}
              />
              <ReadableField
                title='Fecha de nacimiento'
                description={getStringFromDate(new Date(stateProfile.birthDate))}
              />
              <ReadableField
                title='Género'
                description={stateProfile.gender}
              />
            </ListReadableFields>
            <form
              id='user-form'
              className='user-form'
              onSubmit={handleOnSubmit}
            >

              {/* <div className='user-form__inputs-container'> */}

              <TextInput
                required
                id='phone'
                placeholder='Teléfono'
                inputName='phone'
                value={stateProfile.phone}
                onChange={handleOnChange}
              />
              <TextInput
                required
                id='email'
                placeholder='Correo electrónico'
                inputName='email'
                value={stateProfile.email}
                onChange={handleOnChange}
              />
              {/* </div> */}
              <Button
                form='user-form'
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
