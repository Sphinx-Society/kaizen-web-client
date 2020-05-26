import React from 'react';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import Button from '../../atoms/Button/Button';
import userData from '../../../__mocks__/redux/userPrfoileMock';
import ListReadableFields from '../../molecules/ListReadableFields/ListReadableFields';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import './UserProfile.scss';

const UserProfile = function (props) {
  const {
    firstName,
    lastName,
    birthdate,
    phoneNumber,
    gender,
    country,
    email,
    avatar,
    documentId } = userData;
  const { history: { push, goBack } } = props;

  const goToSettingsView = () => push('update-user-profile');
  return (
    <NavbarProvider>
      <MainViewProvider
        menu={<Button onClick={goToSettingsView}>Actualizar Perfil</Button>}
        showBackButton={true}
        onBackButtonClick={() => {
          goBack();
        }}
        title='Mi perfil'
        showBottomLine
        moveTitle
        userCover={avatar}
      >
        <ListReadableFields className='user-info-container'>
          <ReadableField title='Nombre' description={firstName} />
          <ReadableField title='Apellido' description={lastName} />
          <ReadableField title='Fecha de nacimiento' description={birthdate} />
          <ReadableField title='Teléfono' description={phoneNumber} />
          <ReadableField title='Correo electrónico' description={email} />
          <ReadableField title='País' description={country} />
          <ReadableField title='Género' description={gender} />
          <ReadableField title='Identificación' description={documentId} />
        </ListReadableFields>

      </MainViewProvider>
    </NavbarProvider>
  );
};

export default UserProfile;
