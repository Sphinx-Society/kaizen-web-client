import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa';

import './Checkbox.scss';

const Checkbox = (props) => {
  const { id, onChange, checked, size, disabled } = props;
  const [checkedApply, setChecked] = useState(checked);

  const handleOnChange = () => {
    setChecked(!checkedApply);
    onChange();
  };

  const checkedStyles = clsx({
    'checkbox': true,
    'checkbox--off': !checkedApply,
    'checkbox--disabled': disabled,
  });

  return (
    <label htmlFor={id} className={checkedStyles}>
      <div>
        <input
          className='checkbox__input'
          type='checkbox'
          onChange={handleOnChange}
          checked={checkedApply}
          id={id}
          hidden
          disabled={disabled}
        />
        <FaCheck size={size} className={checkedApply ? '' : 'hidden'} />
      </div>
    </label>
  );
};

Checkbox.propTypes = {
  /** The ID for input type checkbox and connect with his label  */
  id: PropTypes.string.isRequired,

  /** Function that will be called on change event */
  onChange: PropTypes.func.isRequired,

  /** Lets start the component as marked */
  checked: PropTypes.bool,

  /** Determine the icon size */
  size: PropTypes.string,

  /** Allows you to disable the checkbox */
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
  size: '1em',
  disabled: false,
};

export default Checkbox;
