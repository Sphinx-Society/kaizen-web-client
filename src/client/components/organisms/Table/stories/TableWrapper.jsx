import React from 'react';
import { IoIosEye as EyeIcon, IoMdTrash as TrashIcon } from 'react-icons/io';
import { FaPen as PencilIcon } from 'react-icons/fa';
import Table from '../Table';
import Checkbox from '../../../atoms/Checkbox/Checkbox';
import Button from '../../../atoms/Button/Button';
import Select from '../../../atoms/Select/Select';
import Surface from '../../../atoms/Surface/Surface';

import './Table.stories.scss';

export const rows = [
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

export const columns = [
  {
    header: (col) => <Checkbox />,
    accessor: '',
    cell: (row) => <Checkbox />,
    id: 0,
    width: '30px',
    collapse: true,
  },
  {
    header: 'Name',
    accessor: 'name',
    id: 1,
    minWidth: '140px',
  },
  {
    header: 'User',
    accessor: 'user',
    id: 2,
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
          />
          <Button
            className='--shadowed table__stories__button'
            icon={<PencilIcon size='1.3em' />}
            type='icon'
            iconMode='2'
          />
          <Button
            className='--shadowed table__stories__button'
            icon={<TrashIcon size='1.3em' />}
            type='icon'
            iconMode='2'
          />
        </div>
      );
    },
    id: 7,
    noFilter: true,
    collapse: true,
  },
];

export const mobileRow = (row) => <Surface>{row.name}</Surface>;

export const menu = () => (
  <div className='table__stories__buttons__container'>
    <Button className='--shadowed table__stories__button'>Import CSV</Button>
    <Button className='--shadowed table__stories__button'>Add user</Button>
  </div>
);

export const TableWrapper = () => {
  return <Table />;
};
