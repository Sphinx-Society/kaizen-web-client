import React from 'react';
import PropTypes from 'prop-types';
import {
  FaEye as ViewIcon,
  FaPen as EditIcon,
  FaTrashAlt as DeleteIcon,
} from 'react-icons/fa';

import ListReadableFields from '../../molecules/ListReadableFields/ListReadableFields';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import Button from '../../atoms/Button/Button';

import './UserCard.scss';
import { prototype } from 'enzyme-adapter-react-16';

const UserCard = (props) => {
  const { data } = props;

  return (
    <article className='user-card ssk--spacing surface__container'>
      <ListReadableFields className='user-card__info'>
        {data.map((item) => <ReadableField title={item.title} description={item.description} />)}
      </ListReadableFields>

      <div className='user-card__actions'>
        <Button
          icon={<ViewIcon size='3em' />}
          type='icon'
          iconMode='2'
          onChange={() => null}
          color='primary'
          className='ssk--boxShadow'
        />
        <Button
          icon={<EditIcon size='3em' />}
          type='icon'
          iconMode='2'
          onChange={() => null}
          className='ssk--boxShadow'
        />
        <Button
          icon={<DeleteIcon size='3em' />}
          type='icon'
          iconMode='2'
          onChange={() => null}
          color='warning'
          className='ssk--boxShadow'
        />
      </div>
    </article>
  );
};

UserCard.propTypes = {
  /** It is the array of objects  */
  data: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, description: PropTypes.string }),
  ).isRequired,
};

UserCard.defaultProps = {};

export default UserCard;
