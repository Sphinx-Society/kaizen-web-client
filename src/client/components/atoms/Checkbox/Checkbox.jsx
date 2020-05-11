import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';

import './Checkbox.scss';

const Checkbox = (props) => {
  const { id, onChange, checked, size } = props;
  const [checkedApply, setChecked] = useState(checked);

  const handleOnChange = () => {
    setChecked(!checkedApply);
    onChange();
  };

  return (
    <label htmlFor={id} className='checkbox'>
      <div>
        <input
          className='checkbox__input'
          type='checkbox'
          onChange={handleOnChange}
          checked={checkedApply}
          id={id}
          hidden
        />
        <FaCheck size={size} className={checkedApply ? '' : 'hidden'} />
      </div>
    </label>
  );
};

Checkbox.propTypes = {
  /** The ID for input type checkbox and connect with his label  */
  id: PropTypes.string.isRequired,

  /** Function that will be called on change event. */
  onChange: PropTypes.func.isRequired,

  /** Lets start the component as marked. Default is false */
  checked: PropTypes.bool,

  /** Determine the icon size */
  size: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: false,
  size: '1em',
};

export default Checkbox;
