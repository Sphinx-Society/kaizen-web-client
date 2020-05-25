import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const PortalProvider = (props) => {
  const { children } = props;

  const portal = document.getElementById('portal');

  const closePortal = () => portal.classList.remove('portal--enable');

  useEffect(() => {
    portal.classList.add('portal', 'portal--enable');
    return closePortal;
  }, []);

  return createPortal(children(closePortal), portal);
};

PortalProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PortalProvider;
