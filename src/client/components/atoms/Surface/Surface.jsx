import React from 'react';
import PropTypes from 'prop-types';
import './Surface.scss';

const Surface = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={`surface__container ${className}`}>
      {children}
    </div>
  );
};

Surface.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Surface.defaultProps = {
  className: '',
};

export default Surface;
