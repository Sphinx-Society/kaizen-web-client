import React from 'react';
import Navbar from '../../organisms/Navbar/Navbar';
import './NavbarProvider.scss';

const NavbarProvider = ({ children }) => {
  return (
    <div className='navbar-provider'>
      {children}
      <div className='navbar-provider__navbar'>
        <Navbar />
      </div>
    </div>
  );
};

export default NavbarProvider;
