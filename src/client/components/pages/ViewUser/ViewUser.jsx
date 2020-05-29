import React from 'react';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import MainViewProvider from '../../providers/MainViewProvider/MainViewProvider';
import ListReadableFields from '../../molecules/ListReadableFields/ListReadableFields';
import Button from '../../atoms/Button/Button';
import userData from '../../../__mocks__/redux/userPrfoileMock';

import './UserProfile.scss';

const ViewUser = function (props) {
  const {
    firstName,
    lastName,
    birthdate,
    phoneNumber,
    gender,
    country,
    email,
    documentId } = userData;
  const { history: { push, goBack }, match: { params: { key } } } = props;

  const goToSettingsView = () => push('update-user-profile');
  return (
    <NavbarProvider>
      <MainViewProvider
        menu={(
          <div>
            <Button color='secondary' onClick={() => null}>Eliminar usuario</Button>
            <Button onClick={() => null}>Editar usuario</Button>
          </div>
        )}
        showBackButton={true}

        title={`Ver usuario ${key}`}
        showBottomLine
        moveTitle
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

export default ViewUser;
