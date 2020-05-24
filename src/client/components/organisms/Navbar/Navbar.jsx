import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { MdFindInPage as ExamsIcon } from 'react-icons/md';
import { GoGear as SettingsIcon } from 'react-icons/go';
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import Logo from '../../atoms/Logo/Logo';

import './Navbar.scss';

const Navbar = (props) => {
  const { isAdmin } = props ;
  return (
    <nav className='navbar'>
      <div className='navbar__logo .ssk--boxShadow'>
        <Logo size='30px' />
      </div>
      <div className='navbar__buttons'>
        <div className='button--container'>
          <NavLink className='link' to='/home' activeClassName='is-selected'>
            <HomeIcon size='2em' />
          </NavLink>
          <dd>Inicio</dd>
        </div>
        {isAdmin && (
          <div className='button--container'>
            <NavLink to='/exams' activeClassName='is-selected'>
              <ExamsIcon size='2em' />
            </NavLink>
            <dd>Examenes</dd>
          </div>
        )}
        <div className='button--container'>
          <NavLink to='/settings' activeClassName='is-selected'>
            <SettingsIcon size='2em' />
          </NavLink>
          <dd>Ajustes</dd>
        </div>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  /** It is the administrator who will see the information  */
  isAdmin: PropTypes.bool,

};
Navbar.defaultProps = {
  isAdmin: false,
};
export default Navbar;
