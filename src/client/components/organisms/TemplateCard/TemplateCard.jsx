import React from 'react';
import PropTypes from 'prop-types';
import {
  FaEye as EyeIcon,
  FaPen as PenIcon,
  FaTrashAlt as TrashIcon,
} from 'react-icons/fa';
import Surface from '../../atoms/Surface/Surface';
import Button from '../../atoms/Button/Button';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import { getStringFromDate } from '../../../utils/date';

import './TemplateCard.scss';

const TemplateCard = (props) => {
  const {
    name,
    category,
    creationDate,
  } = props;

  const formattedDate = getStringFromDate(new Date(creationDate));

  return (
    <Surface disableSpacing className='template-card'>
      <div>
        <ReadableField
          className='template-card__readable-field'
          title='Nombre'
          description={name}
        />
        <ReadableField
          className='template-card__readable-field'
          title='Categoría'
          description={category}
        />
        <ReadableField
          className='template-card__readable-field'
          title='Fecha de creación'
          description={formattedDate}
        />
      </div>
      <div className='template-card__buttons-container'>
        <Button
          className='template-card__buttons-container__button --shadowed'
          type='icon'
          icon={<EyeIcon />}
          iconMode='1'
        />
        <Button
          className='template-card__buttons-container__button --shadowed'
          type='icon'
          icon={<PenIcon />}
          iconMode='1'
        />
        <Button
          className='template-card__buttons-container__button --shadowed'
          type='icon'
          icon={<TrashIcon />}
          iconMode='1'
        />
      </div>
    </Surface>
  );
};

TemplateCard.propTypes = {
  /** Name of the exam */
  name: PropTypes.string.isRequired,
  /** Category where the exam below*/
  category: PropTypes.string.isRequired,
  /** Date where the exam was created*/
  creationDate: PropTypes.number.isRequired,
};

export default TemplateCard;
