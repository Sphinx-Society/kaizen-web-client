import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineUser as ProfileIcon } from 'react-icons/ai';

import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import Surface from '../../atoms/Surface/Surface';
import Button from '../../atoms/Button/Button';
import Logo from '../../atoms/Logo/Logo';

import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';

import useWindowDimensions from '../../../hooks/useWindowDimensions/useWindowDimensions';

import { setUser } from '../../../redux/user/user.actions';
import { login, userProfile } from '../../../routes/paths';
import { deleteCookie } from '../../../utils/cookie';

import { breakpointMedium } from './Settings.scss';

const Settings = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const logout = () => {
    deleteCookie('token');
    deleteCookie('uid');
    deleteCookie('role');
    dispatch(setUser({ user: null }));
    history.push(login());
  };

  const { width } = useWindowDimensions();
  const isMobile = width < parseInt(breakpointMedium, 10);

  return (
    <NavbarProvider>
      <Surface
        disableSpacing={isMobile}
        disableShadow={isMobile}
      >
        <div className='settings-container'>
          <div className='settings-container__logo'>
            <Logo />
            <h2>Kaizen</h2>
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

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withUserData(withAuth(Settings));
