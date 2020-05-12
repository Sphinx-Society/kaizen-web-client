import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Surface.scss';

const Surface = (props) => {
  const {
    children,
    className,
    disableSpacing,
  } = props;

  const surfaceStyles = clsx({
    'ssk--spacing': !disableSpacing,
    'surface__container': true,
    [className]: className,
  });

  return (
    <div className={surfaceStyles}>
      {children}
    </div>
  );
};

Surface.propTypes = {
  /**
   * The children to be inside the surface
   */
  children: PropTypes.node.isRequired,
  /**
   * It can receive a classname to overwrites it styles
   */
  className: PropTypes.string,
  /**
   * Used to remove the default padding and margin
   */
  disableSpacing: PropTypes.bool,
};

Surface.defaultProps = {
  className: '',
  disableSpacing: false,
};

export default Surface;
