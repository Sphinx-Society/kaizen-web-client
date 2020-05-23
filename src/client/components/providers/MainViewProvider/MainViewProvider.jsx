import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { TiArrowBack as BackIcon } from 'react-icons/ti';
import Button from '../../atoms/Button/Button';

import './MainViewProvider.scss';

const MainViewProvider = (props) => {
  const {
    children,
    menu,
    showBackButton,
    showBottomLine,
    title,
    moveTitle,
  } = props;

  const mainViewProviderClassName = clsx({
    'main-view-provider': true,
    'main-view-provider--title-moved': moveTitle && !showBackButton,
  });

  const headClassName = clsx({
    'main-view-provider__head': true,
    'main-view-provider__head--bottom-line': showBottomLine,
  });

  return (
    <div className={mainViewProviderClassName}>
      {showBackButton && (
        <Button
          color='ligth'
          icon={<BackIcon size='2em' />}
        >
          Volver
        </Button>
      )}
      <div className={headClassName}>
        <h2>{title}</h2>
        {menu}
      </div>
      {children}
    </div>
  );
};

MainViewProvider.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  menu: PropTypes.node,
  showBackButton: PropTypes.bool,
  showBottomLine: PropTypes.bool,
};

MainViewProvider.defaultProps = {
  menu: null,
  showBackButton: false,
  showBottomLine: false,
};

export default MainViewProvider;
