import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MdFindInPage as ExamsIcon } from 'react-icons/md';
import { GoGear as SettingsIcon } from 'react-icons/go';
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import Logo from '../../atoms/Logo/Logo';

import {
  templatesManagement,
  main,
  settings,
  usersManagement,
  testsHistory,
  patientsManagement,
} from '../../../routes/paths';

import './Navbar.scss';

const Navbar = () => {
  const { role } = useSelector((state) => state.user.user);
  const isAdmin = role === 'admin';

  const mainPath = () => {
    switch (role) {
      case 'admin': {
        return usersManagement();
      }
      case 'patient': {
        return testsHistory();
      }
      case 'lab':
      case 'doctor': {
        return patientsManagement();
      }
      default: {
        return main();
      }
    }
  };

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
            to={mainPath()}
            exact
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
              exact
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
            to={settings()}
            exact
          >
            <SettingsIcon />
          </NavLink>
          <dd>Ajustes</dd>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
