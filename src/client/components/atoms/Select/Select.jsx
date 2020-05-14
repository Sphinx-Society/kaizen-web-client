import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './Select.scss';

const Select = (props) => {
  const {
    name, id, placeholder, value, onChange,
    form, required, options,
  } = props;

  const selectLabelStyles = clsx({
    'select__label': true,
    'select__label--value': value,
  });

  return (
    <div className='select'>
      <label htmlFor={id} className={selectLabelStyles}>{placeholder}</label>

      <select
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        form={form}
        required={required}
        className='select__select'
      >
        <option value=''>{value}</option>
        {options.map((item) => <option value={item} key={item}>{item}</option>)}
      </select>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Select.defaultProps = {
  form: undefined,
  required: false,
  options: [],
};

export default Select;
