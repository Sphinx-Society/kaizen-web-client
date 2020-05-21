import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaCircle as CircleIcon } from 'react-icons/fa';

import './Toggle.scss';

const Toggle = (props) => {
  const { id, onChange, checked, size, disabled } = props;
  const [toggleApply, setToggle] = useState(checked);

  const handleOnChange = () => {
    if (!disabled) {
      setToggle(!toggleApply);
      onChange();
    }
  };

  const toggleClassName = clsx({
    'toggle': true,
    'toggle--disabled': disabled,
  });

  const circleClassName = clsx({
    'toggle__cicle': true,
    'toggle__cicle--on': toggleApply,
  });

  return (
    <label htmlFor={id} className={toggleClassName} onChange={handleOnChange}>
      <div>
        <input
          className='toggle__input'
          type='checkbox'
          checked={toggleApply}
          readOnly
          id={id}
          hidden
          disabled={disabled}
        />
        <CircleIcon size={size} className={circleClassName} />
      </div>
    </label>
  );
};

Toggle.propTypes = {
  /** The ID for input type checkbox and connect with his label  */
  id: PropTypes.string.isRequired,
  /** Function that will be called on change event */
  onChange: PropTypes.func.isRequired,
  /** Lets start the component as marked, and it is possible interact to change status */
  checked: PropTypes.bool,
  /** Determine the icon size */
  size: PropTypes.string,
  /** Allows you to disable the input checkbox */
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  checked: false,
  size: '1em',
  disabled: false,
};

export default Toggle;
