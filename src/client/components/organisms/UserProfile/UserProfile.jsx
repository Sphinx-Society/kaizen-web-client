import React from 'react';
import { Link } from 'react-router-dom';

import { FaUserAlt as UserDefaultCover } from 'react-icons/fa';
import { TiArrowBack as GoBackIcon } from 'react-icons/ti';
import Button from '../../atoms/Button/Button';
import ReadableField from '../../atoms/ReadableField/ReadableField';

import './UserProfile.scss';

const UserProfile = () => {
  return (
    <div data-test='user-profile' className='user-profile'>
      <Button className='goback' onClick={() => null} color='light' icon={<GoBackIcon />} />
      <div className='user-profile__avatar'>

        <UserDefaultCover size='2em' />
        {/* <img data-test='profile-avatar' src={Logo} alt='brandLogo' /> */}
      </div>
      <div className='user-profile__info'>
        <ReadableField title='Nombre' description='info' />
        <ReadableField title='Apellido' description='info' />
        <ReadableField title='País' description='info' />
        <ReadableField title='Documento' description='info' />
        <ReadableField title='Fecha de nacimiento' description='info' />
        <ReadableField title='Género' description='info' />
        <ReadableField title='Correo electrónico' description='info' />
        <ReadableField title='Teléfono' description='info' />
      </div>
      <Link to='/'>
        <Button onClick={() => null}>
          {' '}
          Actualizar perfil
        </Button>

      </Link>
    </div>
  );
};

export default UserProfile;
