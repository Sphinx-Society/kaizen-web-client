import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './ReadableField.scss';

const ReadableField = (props) => {
  const { title, description, className } = props;

  const readableFieldClassName = clsx({
    'readable-field': true,
    [className]: className,
  });

  return (
    <div className={readableFieldClassName}>
      <dt className='readable-field__dt'>{title}</dt>
      <dd className='readable-field__dd'>{description}</dd>
    </div>
  );
};

ReadableField.propTypes = {
  /** Element specifies a term in a description or definition list */
  title: PropTypes.string.isRequired,
  /** Element provides the definition or other related text */
  description: PropTypes.string,
  /** Class to overwrite the component stlyes */
  className: PropTypes.string,
};

ReadableField.defaultProps = {
  description: '',
  className: '',
};

export default ReadableField;
