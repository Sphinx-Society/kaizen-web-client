import React from 'react';
import PropTypes from 'prop-types';
import {
  FaEye as EyeIcon,
  FaDownload as DownloadIcon,
} from 'react-icons/fa';
import Surface from '../../atoms/Surface/Surface';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import Button from '../../atoms/Button/Button';
import Checkbox from '../../atoms/Checkbox/Checkbox';

import './TestCard.scss';

const TestCard = (props) => {
  const {
    selected,
    disabled,
    name,
    statusLabel,
    onCheckboxChange,
    doctorName,
    id,
  } = props;

  return (
    <Surface
      className='test-card'
      disableSpacing
    >
      <Checkbox
        checked={selected}
        onChange={onCheckboxChange}
        disabled={disabled}
        id={id}
      />
      <div className='test-card__info'>
        <div className='test-card__info__controls'>
          <ReadableField
            title={name}
            description={doctorName}
          />
          <Button
            className='--shadowed --spaced'
            type='icon'
            icon={<EyeIcon />}
            iconMode='1'
            disabled={disabled}
          />
          <Button
            className='--shadowed --spaced'
            type='icon'
            icon={<DownloadIcon />}
            iconMode='1'
            disabled={disabled}
          />
        </div>
        <h3>{statusLabel}</h3>
      </div>
    </Surface>
  );
};

TestCard.propTypes = {
  selected: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  statusLabel: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TestCard;
