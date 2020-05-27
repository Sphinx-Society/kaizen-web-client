import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  FaPen as EditIcon,
  FaTrashAlt as DeleteIcon,
} from 'react-icons/fa';

import ListReadableFields from '../../molecules/ListReadableFields/ListReadableFields';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import Button from '../../atoms/Button/Button';

import './UserCard.scss';

const UserCard = (props) => {
  const {
    data,
    isAdminWhoView,
    onEditClick,
    onClickDelete,
    sizeIcons,
    className,
  } = props;

  const userCardClassName = clsx({
    'user-card': true,
    '--surface-card': true,
    [className]: className,
  });

  return (
    <article className={userCardClassName}>
      <ListReadableFields className='user-card__info'>
        {data.map((item) => (
          <ReadableField
            title={item.title}
            description={item.description}
            key={item.id}
          />
        ))}
      </ListReadableFields>

      <div className='user-card__actions'>
        {isAdminWhoView && (
          <>
            <Button
              icon={<EditIcon size={sizeIcons} />}
              type='icon'
              iconMode='2'
              onClick={onEditClick(data)}
              className='--boxShadow'
            />
            <Button
              icon={<DeleteIcon size={sizeIcons} />}
              type='icon'
              iconMode='2'
              onClick={onClickDelete}
              color='warning'
              className='--boxShadow'
              id='btn-delete'
            />
          </>
        )}
      </div>
    </article>
  );
};

UserCard.propTypes = {
  /** It is the array of objects to receive descriptive information */
  data: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, description: PropTypes.string }),
  ).isRequired,
  /** It is the administrator who will see the information  */
  isAdminWhoView: PropTypes.bool,
  /** Path to edit user details */
  onEditClick: PropTypes.func.isRequired,
  /** Action to delete specific source */
  onClickDelete: PropTypes.func.isRequired,
  /** Size of action icons */
  sizeIcons: PropTypes.string,
  /** Class to overwrite the styles */
  className: PropTypes.string,
};

UserCard.defaultProps = {
  isAdminWhoView: false,
  sizeIcons: '3em',
  className: '',
};

export default UserCard;
