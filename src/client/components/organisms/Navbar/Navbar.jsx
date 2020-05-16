import React from 'react';
import PropTypes from 'prop-types';

import './Navbar.scss';

const Navbar = (props) => {
  const { children } = props;
  return (
    <nav className='navbar'>
      { children }
    </nav>
  );
};

Navbar.propTypes = {
  /** The components will be rendering as nodes into the Navbar */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

Navbar.defaultProps = {};

export default Navbar;
