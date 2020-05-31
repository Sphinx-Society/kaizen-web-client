import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import withUserData from '../../hocs/withUserData';
import {
  usersManagement,
  login,
  testsHistory,
  patientsManagement,
} from '../../../routes/paths';
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
    case 'lab':
    case 'doctor': {
      return <Redirect to={patientsManagement()} />;
    }
    default: {
      deleteCookie('token');
      deleteCookie('uid');
      return <Redirect to={login()} />;
    }
  }
};

export default withUserData(withAuth(Main));
