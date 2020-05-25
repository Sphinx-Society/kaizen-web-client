import React from 'react';
import { IoIosEye as EyeIcon, IoMdTrash as TrashIcon } from 'react-icons/io';
import { FaPen as PencilIcon } from 'react-icons/fa';

import Button from '../../components/atoms/Button/Button';
import Select from '../../components/atoms/Select/Select';

const rows = [
  {
    id: 1,
    name: 'Natalina Grayer',
    username: 'ngrayer0',
    country: 'Philippines',
    document: '374288712067536',
    createdAt: '1/12/2020',
    role: 'Médico',
  },
  {
    id: 2,
    name: 'Melva Fahy',
    username: 'mfahy1',
    country: 'Indonesia',
    document: '3587180017845228',
    createdAt: '12/5/2019',
    role: 'Paciente',
  },
  {
    id: 3,
    name: 'Ragnar Clee',
    username: 'rclee2',
    country: 'France',
    document: '5610908162321512',
    createdAt: '6/18/2019',
    role: 'Bacteriologo',
  },
  {
    id: 4,
    name: 'Elinore Rudloff',
    username: 'erudloff3',
    country: 'China',
    document: '5168466895829158',
    createdAt: '9/25/2019',
    role: 'Médico',
  },
  {
    id: 5,
    name: 'Luce Ghioni',
    username: 'lghioni4',
    country: 'France',
    document: '3582257798224107',
    createdAt: '9/15/2019',
    role: 'Paciente',
  },
  {
    id: 6,
    name: 'Elysha Swyer',
    username: 'eswyer5',
    country: 'Russia',
    document: '3571447724593914',
    createdAt: '11/2/2019',
    role: 'Bacteriólogo',
  },
];

const columns = [
  {
    header: 'Name',
    accessor: 'name',
    id: 1,
    minWidth: '140px',
  },
  {
    header: 'Role',
    accessor: 'role',
    id: 3,
  },
  {
    header: 'Country',
    accessor: 'country',
    id: 4,
    filter: (col) => <Select options={['Mexico', 'Colombia']} />,
    minWidth: '150px',
  },
  {
    header: 'Document',
    accessor: 'document',
    id: 5,
  },
  {
    header: 'Creation date',
    accessor: 'createdAt',
    id: 6,
    minWidth: '150px',
  },
  {
    header: '',
    accessor: '',
    cell: (row) => {
      return (
        <div className='table__stories__buttons__container'>
          <Button
            className='--shadowed table__stories__button'
            icon={<EyeIcon size='1.3em' />}
            type='icon'
            iconMode='2'
            onChange={() => null}
          />
          <Button
            className='--shadowed table__stories__button'
            icon={<PencilIcon size='1.3em' />}
            type='icon'
            iconMode='2'
            onChange={() => null}
          />
          <Button
            className='--shadowed table__stories__button'
            icon={<TrashIcon size='1.3em' />}
            type='icon'
            iconMode='2'
            onChange={() => null}
          />
        </div>
      );
    },
    id: 7,
    noFilter: true,
    collapse: true,
  },
];

const data = { rows, columns };

export default data;
