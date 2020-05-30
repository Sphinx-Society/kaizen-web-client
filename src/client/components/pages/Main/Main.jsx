import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';
import { usersManagement, login, testsHistory } from '../../../routes/paths';
import { deleteCookie } from '../../../utils/cookie';

const Main = () => {
  const { role } = useSelector((state) => state.user.user);

  switch (role) {
    case 'admin': {
      return <Redirect to={usersManagement()} />;
    }
    case 'patient': {
      return <Redirect to={testsHistory()} />;
    }
    default: {
      deleteCookie('token');
      deleteCookie('uid');
      return <Redirect to={login()} />;
    }
  }
};

export default withUserData(withAuth(Main));
