import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Surface.scss';

const Surface = (props) => {
  const {
    children,
    className,
    disableSpacing,
    disableShadow,
  } = props;

  const surfaceClassName = clsx({
    'surface__container': true,
    '--spaced': !disableSpacing,
    '--shadowed': !disableShadow,
    [className]: className,
  });

  return (
    <div className={surfaceClassName}>
      {children}
    </div>
  );
};

Surface.propTypes = {
  /** The children to be inside the surface */
  children: PropTypes.node.isRequired,
  /** It can receive a classname to overwrites it styles */
  className: PropTypes.string,
  /** Used to remove the default padding and margin */
  disableSpacing: PropTypes.bool,
  /** Used to remove surface shadow */
  disableShadow: PropTypes.bool,
};

Surface.defaultProps = {
  className: '',
  disableSpacing: false,
  disableShadow: false,
};

export default Surface;
