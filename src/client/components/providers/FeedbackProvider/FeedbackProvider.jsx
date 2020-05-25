import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '../../atoms/Alert/Alert';

import { setFeedback } from '../../../redux/feedback/feedback.actions';

const FeedbackProvider = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.feedback.feedback);

  const onClose = () => dispatch(setFeedback({ feedback: { message: '', type: '' } }));

  return (
    <>
      {children}
      {Boolean(message) && (
        <Alert
          message={message}
          type={type}
          onClose={onClose}
        />
      )}
    </>
  );
};

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeedbackProvider;
