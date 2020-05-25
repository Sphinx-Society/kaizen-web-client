import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { MdFindInPage as ExamsIcon } from 'react-icons/md';
import { GoGear as SettingsIcon } from 'react-icons/go';
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import Logo from '../../atoms/Logo/Logo';

import { templatesManagement } from '../../../routes/paths';

import './Navbar.scss';

const Navbar = (props) => {
  const { isAdmin } = props ;

  return (
    <nav className='navbar'>
      <div className='navbar__logo --shadowed'>
        <Logo size='30px' />
      </div>
      <div className='navbar__links'>
        <div className='navbar__links__link'>
          <NavLink
            className='navbar__links__link--unselected'
            activeClassName='navbar__links__link--selected'
            to='/home'
          >
            <HomeIcon />
          </NavLink>
          <dd>Inicio</dd>
        </div>
        {isAdmin && (
          <div className='navbar__links__link'>
            <NavLink
              className='navbar__links__link--unselected'
              activeClassName='navbar__links__link--selected'
              to={templatesManagement()}
            >
              <ExamsIcon />
            </NavLink>
            <dd>Plantillas</dd>
          </div>
        )}
        <div className='navbar__links__link'>
          <NavLink
            className='navbar__links__link--unselected'
            activeClassName='navbar__links__link--selected'
            to='/settings'
          >
            <SettingsIcon />
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
