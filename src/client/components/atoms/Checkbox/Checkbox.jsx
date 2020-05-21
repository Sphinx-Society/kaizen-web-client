import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaCheck as CheckIcon } from 'react-icons/fa';

import './Checkbox.scss';

const Checkbox = (props) => {
  const { id, onChange, checked, size, disabled } = props;
  const [isChecked, setIsChecked] = useState(checked);

  const handleOnChange = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      onChange();
    }
  };

  const checkboxClassName = clsx({
    'checkbox': true,
    'checkbox--enable': isChecked,
    'checkbox--disabled': disabled,
  });

  const iconClassName = clsx({ '--hidden': !isChecked });

  return (
    <label htmlFor={id} className={checkboxClassName} onChange={handleOnChange}>
      <div>
        <input
          className='checkbox__input'
          type='checkbox'
          checked={isChecked}
          readOnly
          id={id}
          hidden
          disabled={disabled}
        />
        <CheckIcon size={size} className={iconClassName} />
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
