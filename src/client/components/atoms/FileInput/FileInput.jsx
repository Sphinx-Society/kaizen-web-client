import React from 'react';
import PropTypes from 'prop-types';
import { FaFileUpload as UploadIcon } from 'react-icons/fa';
import './FileInput.scss';

const FileInput = (props) => {
  const {
    fileName,
    id,
    required,
    onChange,
    label,
  } = props;

  return (
    <div
      className='file-input'
    >
      <label
        className='file-input__label'
        htmlFor={id}
      >
        {fileName || label}
      </label>
      <label
        className='file-input__sublabel'
        htmlFor={id}
      >
        <UploadIcon />
        <input
          type='file'
          className='file-input__input'
          id={id}
          required={required}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

FileInput.propTypes = {
  /** Name of the file */
  fileName: PropTypes.string,
  /** ID of the component an required for the labels to take the input */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** It tells if the input is required */
  required: PropTypes.bool,
  /** Function to call when the input is used */
  onChange: PropTypes.func,
  /** Label to show on the left side */
  label: PropTypes.string,
};

FileInput.defaultProps = {
  fileName: null,
  required: false,
  onChange: null,
  label: 'Selecciona un archivo',
};

export default FileInput;
