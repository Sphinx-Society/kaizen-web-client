import React from 'react';
import PropTypes from 'prop-types';

import './ReadableField.scss';

const ReadableField = (props) => {
  const { title, description } = props;

  return (
    <div className='readable-field'>
      <dt className='readable-field__dt'>{title}</dt>
      <dd className='readable-field__dd'>{description}</dd>
    </div>
  );
};

ReadableField.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ReadableField.defaultProps = {
  description: '',
};

export default ReadableField;
