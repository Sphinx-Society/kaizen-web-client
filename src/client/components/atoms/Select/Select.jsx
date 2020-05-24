import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaChevronDown as DownArrowIcon } from 'react-icons/fa';

import './Select.scss';

const Select = (props) => {
  const {
    name,
    id,
    placeholder,
    value,
    onChange,
    options,
    form,
    required,
    disabled,
    defaultOption,
  } = props;

  const selectClassName = clsx({
    'select': true,
    'select--disabled': disabled,
    'select--value': value,
  });

  const labelClassName = clsx({
    'select__label': true,
    'select__label--value': value || defaultOption,
  });

  return (
    <div className={selectClassName}>
      <label htmlFor={id} className={labelClassName}>{placeholder}</label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        form={form}
        required={required}
        className='select__select'
        disabled={disabled}
      >
        <option value=''>{defaultOption}</option>
        {options.map((item) => {
          if (typeof item === 'string') {
            return (
              <option value={item} key={item}>{item}</option>
            );
          }
          return (
            <option value={item.value} key={item.value}>{item.label}</option>
          );
        })}
      </select>
      <DownArrowIcon size='1.5em' />
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
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })]),
  /** Must be the id of a "form" element in the same document. If the
   * attribute is not specified, this "input" element must be a descendant of
   * a "form" element. */
  form: PropTypes.string,
  /** To make the input field required inside a form */
  required: PropTypes.bool,
  /** This prop make the input disabled */
  disabled: PropTypes.bool,
  /** Default option to return to a defuault value */
  defaultOption: PropTypes.string,
};

Select.defaultProps = {
  options: [],
  form: undefined,
  required: false,
  disabled: false,
  defaultOption: '',
};

export default Select;
