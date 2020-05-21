import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './ListReadableFields.scss';

const ListReadableFields = (props) => {
  const { children, className } = props;

  const dlClassName = clsx({
    'list-readable-fields': true,
    [className]: className,
  });

  return (
    <dl className={dlClassName}>
      {children}
    </dl>
  );
};

ListReadableFields.propTypes = {
  /** Children are nodes expected to be of type `<ReadableFile />` */
  children: PropTypes.node.isRequired,
  /** Class to overwrite the styles */
  className: PropTypes.string,
};

ListReadableFields.defaultProps = {
  className: undefined,
};

export default ListReadableFields;
