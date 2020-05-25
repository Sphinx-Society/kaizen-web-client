import React from 'react';
import LoginTemplate from '../../templates/LoginTemplate/LoginTemplate';
import FeedbackProvider from '../../providers/FeedbackProvider/FeedbackProvider';

const Login = () => {
  return (
    <FeedbackProvider>
      <LoginTemplate />
    </FeedbackProvider>
  );
};

export default Login;
