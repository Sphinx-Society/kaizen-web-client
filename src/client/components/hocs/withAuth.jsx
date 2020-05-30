import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { login } from '../../routes/paths';

const withAuth = (Component) => class ComponentWithAuth extends React.Component {
  constructor(props) {
    super(props);
    this.token = getCookie('token');
  }

  render() {
    if (!this.token) {
      return (
        <Redirect to={login()} />
      );
    }

    return (
      <Component {...this.props} />
    );
  }
};

export default withAuth;
