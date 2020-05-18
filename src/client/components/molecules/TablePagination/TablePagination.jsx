import React from 'react';
import clsx from 'clsx';
import {
  MdChevronLeft as LeftIcon,
  MdChevronRight as RightIcon,
} from 'react-icons/md';
import Button from '../../atoms/Button/Button';

import './TablePagination.scss';

const TablePagination = (props) => {
  const {
    rows,
    totalRows,
    page,
    onPrevPageClick,
    onNextPageClick,
  } = props;

  const pageSize = rows.length;

  const className = clsx({ 'table__pagination-container': true });
  const itemClassName = clsx({ 'table__pagination-container__item': true });
  const menuClassName = clsx({ 'table__pagination-container__item__buttons-container': true });
  const buttonClassName = clsx({ 'ssk--boxShadow': true });

  const Icon = ({ side }) => (side === 'left' ? <LeftIcon size='1.3em' /> : <RightIcon size='1.3em' />);

  return (
    <div className={className}>
      <div className={itemClassName}>
        <p>
          Mostrando:
          {' '}
          <b>{pageSize}</b>
        </p>
      </div>
      <div className={itemClassName}>
        <p>{`${page} - ${page * pageSize} de ${totalRows}`}</p>
        <div className={menuClassName}>
          <Button
            className={buttonClassName}
            icon={<Icon side='left' />}
            type='icon'
            iconMode='2'
            onClick={onPrevPageClick}
          />
          <Button
            className={buttonClassName}
            icon={<Icon side='rigth' />}
            type='icon'
            iconMode='2'
            onClick={onNextPageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
