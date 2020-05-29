import React from 'react';
import PropTypes from 'prop-types';
import { FaUserAlt as UserCoverIcon } from 'react-icons/fa';
import './UserCover.scss';

const UserCover = (props) => {
  const { avatar } = props;

  return (
    <div className='user-cover'>
      {avatar.length > 0 ? <img src={avatar} alt='user-cover' /> : <UserCoverIcon />}

    </div>
  );
};

UserCover.propTypes = {
  /** The ID for input type checkbox and connect with his label  */
  avatar: PropTypes.string,
};

UserCover.defaultProps = {
  avatar: '',
};

export default UserCover;
