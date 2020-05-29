import React from 'react';

import ShapesContainer from '../../organisms/ShapesContainer/ShapesContainer';
import LoginForm from '../../organisms/LoginForm/LoginForm';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';
import withoutAuth from '../../hocs/withoutAuth';

import './Login.scss';

const Login = () => {
  return (
    <FeedbackProvider>
      <div className='login'>
        <ShapesContainer />
        <LoginForm />
      </div>
    </FeedbackProvider>
  );
};

export default withoutAuth(Login);
