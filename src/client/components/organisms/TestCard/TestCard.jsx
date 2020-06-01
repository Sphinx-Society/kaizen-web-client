import React from 'react';
import PropTypes from 'prop-types';
import {
  FaEye as EyeIcon,
  FaDownload as DownloadIcon,
  FaTrashAlt as DeleteIcon,
} from 'react-icons/fa';
import Surface from '../../atoms/Surface/Surface';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import Button from '../../atoms/Button/Button';
import Checkbox from '../../atoms/Checkbox/Checkbox';

import './TestCard.scss';

const TestCard = (props) => {
  const {
    selectedCheckbox,
    disabledCheckbox,
    name,
    statusLabel,
    onCheckboxChange,
    doctorName,
    id,
    hideDownloadButton,
    hideDeleteButton,
    onDownload,
    onView,
    disabledDownload,
    disabledView,
    disableDelete,
    hideCheckbox,
  } = props;

  return (
    <Surface
      className='test-card'
      disableSpacing
    >
      {!hideCheckbox && (
        <Checkbox
          checked={selectedCheckbox}
          onChange={onCheckboxChange}
          disabled={disabledCheckbox}
          id={id}
        />
      )}
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
            disabled={disabledView}
            onClick={onView}
          />
          {!hideDownloadButton && (
            <Button
              className='--shadowed --spaced'
              type='icon'
              icon={<DownloadIcon />}
              iconMode='1'
              disabled={disabledDownload}
              onClick={onDownload}
            />
          )}
          {!hideDeleteButton && (
            <Button
              className='--shadowed --spaced'
              type='icon'
              icon={<DeleteIcon />}
              iconMode='1'
              disabled={disableDelete}
              onClick={onDelete}
            />
          )}
        </div>
        <h3>{statusLabel}</h3>
      </div>
    </Surface>
  );
};

TestCard.propTypes = {
  selectedCheckbox: PropTypes.bool.isRequired,
  disabledCheckbox: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  statusLabel: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hideDownloadButton: PropTypes.bool,
  hideCheckbox: PropTypes.bool,
  onDownload: PropTypes.func,
  onView: PropTypes.func,
  disabledDownload: PropTypes.bool,
  disabledView: PropTypes.bool,
  disableDelete: PropTypes.bool,
};

TestCard.defaultProps = {
  hideDownloadButton: false,
  hideCheckbox: false,
  onDownload: null,
  onView: null,
  disabledDownload: false,
  disabledView: false,
  disableDelete: false,
};

export default TestCard;
