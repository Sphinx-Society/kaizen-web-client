import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Surface.scss';

const Surface = (props) => {
  const {
    children,
    className,
  } = props;

  const surfaceStyles = clsx({
    'ssk--spacing': true,
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Surface.defaultProps = {
  className: '',
};

export default Surface;
