import React from 'react';
import ReadableField from '../../atoms/ReadableField/ReadableField';
import ListReadableFields from '../../molecules/ListReadableFields/ListReadableFields';

import './UserProfile.scss';

const UserProfileList = (props) => {
  const { data } = props;

  return (
    <ListReadableFields>
      <ReadableField title='Nombres' description={data.firstName} />
      <ReadableField title='Apellidos' description={data.lastName} />
      <ReadableField title='Documento' description={data.document} />
      <ReadableField title='Género' description={data.gender} />
      <ReadableField title='Fecha de nacimiento' description={data.birthday} />
    </ListReadableFields>
  );
};

export default UserProfileList;
