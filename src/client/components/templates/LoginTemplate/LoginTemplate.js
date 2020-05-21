import React from 'react';
import ShapesContainer from '../../organisms/ShapesContainer/ShapesContainer';
import LoginForm from '../../organisms/Login-form/LoginForm';

import './LoginTemplate.scss';

const LoginTemplate = () => {
  return (
    <div className='login-template'>
      <ShapesContainer />
      <LoginForm />
    </div>
  );
};

export default LoginTemplate;
