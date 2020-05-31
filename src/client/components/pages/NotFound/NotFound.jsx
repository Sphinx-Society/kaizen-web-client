import React from 'react';
import NavbarProvider from '../../providers/NavbarProvider/NavbarProvider';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import Surface from '../../atoms/Surface/Surface';
import Logo from '../../atoms/Logo/Logo';
import withAuth from '../../hocs/withAuth';

import useWindowDimensions from '../../../hooks/useWindowDimensions/useWindowDimensions';

import { breakpointMedium } from './NotFound.scss';

const NotFound = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < parseInt(breakpointMedium, 10);

  return (
    <FeedbackProvider>
      <NavbarProvider>
        <Surface
          disableSpacing={isMobile}
          disableShadow={isMobile}
        >
          <div className='not-found'>
            <Logo />
            <h2>Página no encontrada</h2>
          </div>
        </Surface>
      </NavbarProvider>
    </FeedbackProvider>
  );
};

export default withAuth(NotFound);
