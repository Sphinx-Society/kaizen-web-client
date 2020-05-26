import React from 'react';
import {
  AiOutlineUser as ProfileIcon,
  AiOutlineLogout as LogoutIcon } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Surface from '../../atoms/Surface/Surface';
import Logo from '../../atoms/Logo/Logo';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import './Settings.scss';

const Settings = () => {

  return (

    <NavbarProvider>
      <Surface>
        <div className='settings-container'>
          <div className='settings-container__logo'>
            <Logo />
            <h2> Kaizen</h2>
          </div>
          <section className='settings-container__options'>
            <Link id='profile-link' className='option-container' to='/profile'>
              <dd>Ver mi perfil</dd>
              <ProfileIcon size='1.5em' />
            </Link>

            <Link id='logout' className='option-container logout' to='/'>
              <dd>Cerrar sesión</dd>
              <LogoutIcon size='1.5em' />
            </Link>
          </section>
        </div>
      </Surface>
    </NavbarProvider>

  );
};

export default Settings;

