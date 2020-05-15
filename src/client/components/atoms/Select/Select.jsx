import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { MdKeyboardArrowDown } from 'react-icons/md';

import './Select.scss';

const Select = (props) => {
  const {
    name, id, placeholder, value, onChange,
    options, form, required, disabled,
  } = props;

  const selectStyles = clsx({
    'select': true,
    'select--disabled': disabled,
    'select--value': value,
  });

  const selectLabelStyles = clsx({
    'select__label': true,
    'select__label--value': value,
  });

  return (
    <div className={selectStyles}>
      <label htmlFor={id} className={selectLabelStyles}>{placeholder}</label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        form={form}
        required={required}
        className='select__select'
        disabled={disabled}
      >
        <option value=''>{value}</option>
        {options.map((item) => <option value={item} key={item}>{item}</option>)}
      </select>
      <MdKeyboardArrowDown size='2em' />
    </div>
  );
};

Select.propTypes = {
  /** The name of the control, which is sent with the form data */
  name: PropTypes.string.isRequired,

  /** The input identification, it's also needed for the placeholder to move on click */
  id: PropTypes.string.isRequired,

  /** It represent both, placeholder and label */
  placeholder: PropTypes.string.isRequired,

  /** Value to be shown on the input */
  value: PropTypes.string.isRequired,

  /** Function to be called on input change to set a new value */
  onChange: PropTypes.func.isRequired,

  /** List of elements to display in selector */
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

  /** Must be the id of a "form" element in the same document. If the
   * attribute is not specified, this "input" element must be a descendant of
   * a "form" element. */
  form: PropTypes.string,

  /** To make the input field required inside a form */
  required: PropTypes.bool,

  /** This prop make the input disabled */
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  options: [],
  form: undefined,
  required: false,
  disabled: false,
};

export default Select;
