import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '../../atoms/TableCell/TableCell';

import TableColumnSchema from '../../../schemas/TableColumn/TableColumn';
import TableRowSchema from '../../../schemas/TableRow/TableRow';

import './TableBody.scss';

const TableBody = (props) => {
  const {
    isLoading,
    isMobile,
    rows,
    columns,
    mobileRow,
  } = props;

  const Wrapper = ({ children }) => (isMobile ? <div>{children}</div> : <tbody>{children}</tbody>);

  const RowWrapper = ({ children, row }) => {
    if (isMobile && typeof mobileRow === 'function') {
      return mobileRow(row);
    }

    return (
      <tr className='table-body__row'>{children}</tr>
    );
  };

  return (
    <Wrapper>
      {!isLoading && rows.map((row) => (
        <RowWrapper key={row.id} row={row}>
          {columns.map((col) => <TableCell key={col.id} col={col} row={row} />)}
        </RowWrapper>
      ))}
    </Wrapper>
  );
};

TableBody.propTypes = {
  /** To render the loading variant */
  isLoading: PropTypes.bool.isRequired,
  /** To render the mobile version of the table body */
  isMobile: PropTypes.bool.isRequired,
  /** The rows to render inside the body */
  rows: PropTypes.arrayOf(TableRowSchema).isRequired,
  /** The columns to render inside each row */
  columns: PropTypes.arrayOf(TableColumnSchema).isRequired,
  /** If the mobile version is used it can a receive a differente mobile type row */
  mobileRow: PropTypes.func,
};

TableBody.defaultProps = {
  mobileRow: null,
};

export default TableBody;
