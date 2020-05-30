import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { main } from '../../routes/paths';

const withoutAuth = (Component) => class ComponentWithoutAuth extends React.Component {
  constructor(props) {
    super(props);
    this.token = getCookie('token');
  }

  render() {
    if (this.token) {
      return (
        <Redirect to={main()} />
      );
    }

    return (
      <Component {...this.props} />
    );
  }
};

export default withoutAuth;
