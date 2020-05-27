import React from 'react';
import PropTypes from 'prop-types';
import {
  FaPen as PenIcon,
  FaTrashAlt as TrashIcon,
} from 'react-icons/fa';
import Surface from '../../atoms/Surface/Surface';
import Button from '../../atoms/Button/Button';
import ReadableField from '../../atoms/ReadableField/ReadableField';

import './TemplateCard.scss';

const TemplateCard = (props) => {
  const {
    name,
    category,
    creationDate,
    onView,
    onDelete,
  } = props;

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
          description={creationDate}
        />
      </div>
      <div className='template-card__buttons-container'>
        <Button
          className='template-card__buttons-container__button --shadowed'
          type='icon'
          icon={<PenIcon />}
          iconMode='1'
          onClick={onView}
        />
        <Button
          className='template-card__buttons-container__button --shadowed'
          type='icon'
          icon={<TrashIcon />}
          iconMode='1'
          onClick={onDelete}
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
  creationDate: PropTypes.string.isRequired,
  /** Function to be called when view button is clicked */
  onView: PropTypes.func.isRequired,
  /** Function to be called when delete button is clicked */
  onDelete: PropTypes.func.isRequired,
};

export default TemplateCard;
