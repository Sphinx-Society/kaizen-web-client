import React from 'react';
import PropTypes from 'prop-types';
import {
  FaChevronLeft as LeftIcon,
  FaChevronRight as RightIcon,
} from 'react-icons/fa';
import Button from '../../atoms/Button/Button';

import TableRowSchema from '../../../schemas/TableRow/TableRow';

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

  const Icon = ({ side }) => (side === 'left' ? <LeftIcon size='1.3em' /> : <RightIcon size='1.3em' />);

  return (
    <div className='table-pagination'>
      <div className='table-pagination__item'>
        <p>
          Mostrando:
          {' '}
          <b>{pageSize}</b>
        </p>
      </div>
      <div className='table-pagination__item'>
        <p>{`${page} - ${page * pageSize} de ${totalRows}`}</p>
        <div className='table-pagination__item__buttons-container'>
          <Button
            className='--shadowed'
            icon={<Icon side='left' />}
            type='icon'
            iconMode='2'
            onClick={onPrevPageClick}
          />
          <Button
            className='--shadowed'
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

TablePagination.propTypes = {
  /** The rows that the table renders */
  rows: PropTypes.arrayOf(TableRowSchema).isRequired,
  /** As the table can work with dynamic data and fetch only the actual page it receive the data lenght */
  totalRows: PropTypes.number.isRequired,
  /** Actual page the table is showing */
  page: PropTypes.number.isRequired,
  /** Function to call when next page button is clicked */
  onNextPageClick: PropTypes.func.isRequired,
  /** Function to call when prev page button is clicked */
  onPrevPageClick: PropTypes.func.isRequired,
};

export default TablePagination;
