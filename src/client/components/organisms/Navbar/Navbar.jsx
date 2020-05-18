import React from 'react';
import PropTypes from 'prop-types';
import { MdFindInPage } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { FaUser } from 'react-icons/fa';
import Button from '../../atoms/Button/Button';

import './Navbar.scss';

const Navbar = (props) => {
  const { onClickSearch, onClickProfile, onClickSettings } = props;

  return (
    <nav className='navbar'>
      <div className='navbar__logo'>
        <svg width='3em' height='3em' viewBox='-10 -10 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path fillRule='evenodd' clipRule='evenodd' d='M28.4556 1.11816H17.4357C13.919 3.95512 11.6934 8.15066 11.6934 12.8318C11.6934 17.2755 13.6989 21.2816 16.9107 24.1034H27.739L13.7908 13.0201L28.4556 1.11816Z' fill='#B5E2FA' />
          <path fillRule='evenodd' clipRule='evenodd' d='M7.6719 0.676086C3.55449 3.16739 0.810547 7.62998 0.810547 12.7207C0.810547 17.8114 3.55449 22.274 7.6719 24.7653V0.676086Z' fill='#0066FF' />
        </svg>
      </div>

      <div className='navbar__buttons'>
        <Button
          icon={<MdFindInPage size='3em' />}
          type='icon'
          color='primary'
          onClick={onClickSearch}
        />
        <Button
          icon={<FaUser size='3em' />}
          type='icon'
          color='primary'
          onClick={onClickProfile}
        />
        <Button
          icon={<GoGear size='3em' />}
          type='icon'
          color='primary'
          onClick={onClickSettings}
        />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  /** Function that will be called on click event by btn-icon Search */
  onClickSearch: PropTypes.func.isRequired,

  /** Function that will be called on click event by btn-icon user Profile */
  onClickProfile: PropTypes.func.isRequired,

  /** Function that will be called on click event by btn-icon Settings / Settings */
  onClickSettings: PropTypes.func.isRequired,
};

export default Navbar;
