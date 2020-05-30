import React from 'react';

import {
  AiOutlineUser as ProfileIcon } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/user.actions';

import Surface from '../../atoms/Surface/Surface';
import Logo from '../../atoms/Logo/Logo';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import './Settings.scss';
import { login, userProfile } from '../../../routes/paths';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';
import { deleteCookie } from '../../../utils/cookie';
import Button from '../../atoms/Button/Button';

const Settings = (props) => {
  const dispatch = useDispatch();

  const { history } = props;
  const logout = () => {
    deleteCookie('token');
    deleteCookie('uid');
    dispatch(setUser({}));
    history.push(login());
  };

  return (
    <NavbarProvider>
      <Surface>
        <div className='settings-container'>
          <div className='settings-container__logo'>
            <Logo />
            <h2> Kaizen</h2>
          </div>
          <section className='settings-container__options'>
            <Link id='profile-link' className='option-container' to={userProfile()}>
              <dd>Ver mi perfil</dd>
              <ProfileIcon size='1.5em' />
            </Link>
            <Button onClick={logout}>Cerrar sesión</Button>
          </section>
        </div>
      </Surface>
    </NavbarProvider>
  );
};

export default withUserData(withAuth(Settings));
