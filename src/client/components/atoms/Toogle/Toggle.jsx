import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaCircle } from 'react-icons/fa';

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

  const toggleStyles = clsx({
    'toggle': true,
    'toggle--disabled': disabled,
  });

  const toggleCircleStyles = clsx({
    'toggle__cicle': true,
    'toggle__cicle--on': toggleApply,
  });

  return (
    <label htmlFor={id} className={toggleStyles} onChange={handleOnChange}>
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
        <FaCircle size={size} className={toggleCircleStyles} />
      </div>
    </label>
  );
};

Toggle.propTypes = {
  /** The ID for input type checkbox and connect with his label  */
  id: PropTypes.string.isRequired,

  /** Function that will be called on change event */
  onChange: PropTypes.func.isRequired,

  /** Lets start the component as marked */
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
