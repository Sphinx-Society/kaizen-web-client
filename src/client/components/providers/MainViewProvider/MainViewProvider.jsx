import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { TiArrowBack as BackIcon } from 'react-icons/ti';
import UserCover from '../../atoms/UserCover/UserCover';
import Button from '../../atoms/Button/Button';
import Surface from '../../atoms/Surface/Surface';
import useWindowDimensions from '../../../hooks/useWindowDimensions/useWindowDimensions';

import { breakpointMedium } from './MainViewProvider.scss';

const MainViewProvider = (props) => {
  const {
    children,
    menu,
    showBackButton,
    showBottomLine,
    title,
    moveTitle,
    onBackButtonClick,
    avatar,
    lowerMore,
  } = props;

  const { width } = useWindowDimensions();
  const isMobile = width < parseInt(breakpointMedium, 10);

  const mainViewProviderClassName = clsx({
    'main-view-provider': true,
    'main-view-provider--title-moved': moveTitle && !showBackButton,
    'main-view-provider--title-moved-x2': lowerMore,
  });

  const headClassName = clsx({
    'main-view-provider__head': true,
    'main-view-provider__head--bottom-line': showBottomLine,
  });

  return (
    <Surface
      className='main-view-provider-surface-container'
      disableSpacing={isMobile}
      disableShadow={isMobile}
    >
      <div className={mainViewProviderClassName}>
        {showBackButton && (
          <Button
            color='light'
            icon={<BackIcon size='2em' />}
            onClick={onBackButtonClick}
          >
            Volver
          </Button>
        )}
        <div className={headClassName}>
          {avatar && <UserCover avatar={avatar} /> }

          <h2>{title}</h2>
          {menu}
        </div>
        <main>
          {children}
        </main>
      </div>
    </Surface>
  );
};

MainViewProvider.propTypes = {
  /** Children to render inside the provider */
  children: PropTypes.node.isRequired,
  /** Title to show inside the provider */
  title: PropTypes.string.isRequired,
  /** Function to call when the back button is clicked, required if showBackButton is true */
  userCover: PropTypes.string,
  /** Menu to render inside the provider */
  menu: PropTypes.node,
  /** It decide if the back button should be shown */
  showBackButton: PropTypes.bool,
  /** It decide if the bottom line should be shown */
  showBottomLine: PropTypes.bool,
  /** It decide if the title should be moved down */
  moveTitle: PropTypes.bool,
  /** Function to call when the back button is clicked, required if showBackButton is true */
  onBackButtonClick: PropTypes.func,
  /** Add more top spacing */
  lowerMore: PropTypes.bool,
};

MainViewProvider.defaultProps = {
  menu: null,
  onBackButtonClick: () => null,
  showBackButton: false,
  showBottomLine: false,
  moveTitle: false,
  lowerMore: false,
};

export default MainViewProvider;
