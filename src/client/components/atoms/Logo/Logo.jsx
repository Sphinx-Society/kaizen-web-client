import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './Logo.scss';

const Logo = (props) => {
  const {
    isLoading,
    size,
    label,
    hideLabel,
  } = props;

  const legsClassName = clsx({
    'resize': isLoading,
  });

  const backClassName = clsx({
    'resize--inverted': isLoading,
  });

  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        fill='none'
        viewBox='0 0 105 91'
      >
        <path
          className={legsClassName}
          fill='#B5E2FA'
          fillRule='evenodd'
          d='M105 1.67H63.145c-13.356 10.717-21.81 26.566-21.81 44.25 0 16.787 7.618 31.92 19.816 42.58h41.128L49.302 46.631 105 1.67z'
          clipRule='evenodd'
        />
        <path
          className={backClassName}
          fill='#06F'
          fillRule='evenodd'
          d='M26.06 0C10.422 9.41 0 26.27 0 45.5S10.422 81.589 26.06 91V0z'
          clipRule='evenodd'
        />
      </svg>
      {isLoading && !hideLabel && <p>{label}</p>}
    </>
  );
};

Logo.propTypes = {
  /**
   * It tells the component to start the loading animation
   */
  isLoading: PropTypes.bool,
  /**
   * Represent the size of the component
   */
  size: PropTypes.string,
  /**
   * Message to show with loader
   */
  label: PropTypes.string,
  /**
   * It determinate if loader message should be hide
   */
  hideLabel: PropTypes.bool,
};

Logo.defaultProps = {
  isLoading: false,
  size: '60px',
  label: 'Cargando..',
  hideLabel: false,
};

export default Logo;
