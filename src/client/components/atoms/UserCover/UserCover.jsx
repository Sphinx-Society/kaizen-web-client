import React from 'react';
import PropTypes from 'prop-types';
import { FaUserAlt as UserCoverIcon } from 'react-icons/fa';
import './UserCover.scss';

const UserCover = (props) => {
  const { userCover } = props;

  return (
    <div className='user-cover'>
      {userCover.length > 0 ? <img src={userCover} alt='user-cover' /> : <UserCoverIcon />}

    </div>
  );
};

UserCover.propTypes = {
  /** The ID for input type checkbox and connect with his label  */
  userCover: PropTypes.string,
};

UserCover.defaultProps = {
  userCover: '',
};

export default UserCover;
