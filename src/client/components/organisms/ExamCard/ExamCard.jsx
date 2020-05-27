import React from 'react';
import PropTypes from 'prop-types';
import { FaEye as EyeIcon } from 'react-icons/fa';
import Surface from '../../atoms/Surface/Surface';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import Button from '../../atoms/Button/Button';
import Checkbox from '../../atoms/Checkbox/Checkbox';

import { getStringFromDate } from '../../../utils/date';

const ExamCard = (props) => {
  const {
    selected,
    creationDate,
    name,
    state,
    onCheckboxChange,
  } = props;

  const formattedDate = getStringFromDate(new Date(creationDate));

  return (
    <Surface>
      <div className='horizontal-flex-container'>
        <div className='horizontal-flex-container'>
          <Checkbox
            checked={selected}
            onChange={onCheckboxChange}
          />
          <ReadableField
            title={name}
            description={formattedDate}
          />
        </div>
        <Button
          className='--shadowed'
          type='icon'
          icon={<EyeIcon />}
          iconMode='1'
        />
      </div>
      <h3>{state}</h3>
    </Surface>
  );
};

ExamCard.propTypes = {
  selected: PropTypes.bool,
  creationDate: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

ExamCard.defaultProps = {
  selected: false,
};

export default ExamCard;
